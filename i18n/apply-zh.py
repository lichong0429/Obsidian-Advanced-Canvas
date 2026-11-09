# -*- coding: utf-8 -*-
"""Advanced Canvas 简体中文汉化脚本（源码级）

用法：
    python i18n/apply-zh.py           # 作用于本仓库 src/
    python i18n/apply-zh.py <repo>    # 指定仓库根目录

特性：
- 幂等：已翻译的文本不会再被替换，可反复运行
- 只替换引号完整的字符串字面量，不触碰命令 ID、设置键、CSS 类名
- 兼容源码的单引号风格与 \\' 转义，以及模板字符串
- 方向类命令自动注入 DIRECTION_LABELS 常量（类型安全）

上游升级后的维护流程：
    1. 同步上游代码到本仓库
    2. 重新运行本脚本
    3. 检查输出的「未命中」条目：若上游改写了文案，把这些条目的新英文
       补进 strings.json 后重跑
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE)
SRC = os.path.join(REPO, "src")
STRINGS = os.path.join(HERE, "strings.json")

# 短标签：仅在属性字段上下文中替换
SHORT = {
    "Width": "宽度", "Height": "高度", "Diamond": "菱形", "Circle": "圆形",
    "Solid": "实线", "Dotted": "点线", "Left": "左", "Center": "中", "Right": "右",
    "Shape": "形状", "Pill": "胶囊形", "Parallelogram": "平行四边形",
    "Document": "文档", "Database": "数据库", "Border": "边框", "Dashed": "虚线",
    "Invisible": "不可见", "Triangle": "三角形", "Blunt": "平头", "Bezier": "贝塞尔",
    "Direct": "直线", "Square": "方形", "Properties": "属性",
}

# 精确匹配项（源码以单引号为主，个别处用双引号）
PAIRS = [
    # 设置分组标题
    ("heading: 'Portals'", "heading: '传送门'"),
    ("heading: 'Presentations'", "heading: '演示'"),
    # 下拉选项显示值（键保持英文）
    ("'nondirectional': 'Nondirectional'", "'nondirectional': '无方向'"),
    ("'unidirectional': 'Unidirectional'", "'unidirectional': '单向'"),
    ("'bidirectional': 'Bidirectional'", "'bidirectional': '双向'"),
    ("'text': 'Text'", "'text': '文本'"),
    ("'file': 'File'", "'file': '文件'"),
    ("light: 'Light'", "light: '浅色'"),
    ("dark: 'Dark'", "dark: '深色'"),
    # 菜单 / 按钮 / 工具提示
    (".setTitle('Encapsulate')", ".setTitle('封装')"),
    ('setTitle("Remove")', 'setTitle("移除")'),
    (".setButtonText('Save')", ".setButtonText('保存')"),
    ("setTooltip(styleMenuButtonElement, 'Style'", "setTooltip(styleMenuButtonElement, '样式'"),
    (".setName('Theme')", ".setName('主题')"),
    ('this.searchInput.placeholder = "Find..."', 'this.searchInput.placeholder = "查找…"'),
    ("|| 'Untitled'", "|| '未命名'"),
    # 通知与文档按钮
    ('"Metadata node not found or version mismatch. Should have been migrated (but wasn\'t)."',
     '"未找到元数据节点或版本不匹配，本应已完成迁移（但实际没有）。"'),
    ('name: label ? `Open ${label} documentation` : "打开文档"',
     'name: label ? `查看${label}文档` : "打开文档"'),
    ('"custom styles"', '"自定义样式"'),
    ('"edge styling"', '"连线样式"'),
    ('"node styling"', '"节点样式"'),
    # 样式表中的「起点」标记
    ("content: 'Start';", "content: '起点';"),
    # 模板字符串中的界面文案
    ("`Open ${label} documentation`", "`查看${label}文档`"),
    ("`**Group Node:** ${(canvasNode as CanvasGroupNodeData).label}`",
     "`**分组节点：** ${(canvasNode as CanvasGroupNodeData).label}`"),
    ("`**File Node:** ${(canvasNode as CanvasFileNodeData).file}`",
     "`**文件节点：** ${(canvasNode as CanvasFileNodeData).file}`"),
    ("` - Selection of ${nodesToExport.length}`",
     "` - 所选 ${nodesToExport.length} 个节点`"),
    ("`Change the zoom breakpoint (the zoom level at which the nodes won't render their content anymore) on a per-node basis using the ${VARIABLE_BREAKPOINT_CSS_VAR} CSS variable.`",
     "`可为单个节点设置缩放断点（低于该缩放级别时节点不再渲染内容），使用 ${VARIABLE_BREAKPOINT_CSS_VAR} CSS 变量。`"),
]

TPL = {
    "`Clone node ${direction}`": "`向${DIRECTION_LABELS[direction]}克隆节点`",
    "`Expand node ${direction}`": "`向${DIRECTION_LABELS[direction]}扩展节点`",
    "`Navigate ${direction}`": "`向${DIRECTION_LABELS[direction]}导航`",
    "`Create template node ${label}`": "`创建模板节点 ${label}`",
    "`Apply template ${label} to selected node(s)`": "`将模板 ${label} 应用到所选节点`",
    "`Extended commands configuration`": "`扩展命令配置`",
}

DIRECTIONS_DEF = "const DIRECTIONS = ['up', 'down', 'left', 'right'] as Direction[]"
DIRECTIONS_LABELS = (
    "\nconst DIRECTION_LABELS: Record<Direction, string> = "
    "{ up: '上', down: '下', left: '左', right: '右' }"
)

FILES = []
for root, _dirs, names in os.walk(SRC):
    for n in names:
        if n.endswith((".ts", ".tsx", ".scss", ".css")):
            FILES.append(os.path.join(root, n))


def variants(en):
    """原文的候选形式：原样、转义撇号。"""
    out = [en]
    if "'" in en:
        out.append(en.replace("'", "\\'"))
    return out


def replace_literals(s, en, zh):
    """替换引号完整或模板字符串形式的字面量，返回 (新文本, 命中数)。"""
    n = 0
    for v in variants(en):
        esc = re.escape(v)
        for pat in (
            re.compile(r'(?P<q>["\'])' + esc + r'(?P=q)'),
            re.compile(r'(?P<q>`)' + esc + r'(?P=q)'),
        ):
            found = pat.findall(s)
            if found:
                n += len(found)
                s = pat.sub(lambda m: m.group("q") + zh + m.group("q"), s)
    return s, n


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"找不到源码目录：{SRC}")

    strings = json.load(open(STRINGS, encoding="utf-8"))
    # 长句优先：避免「Properties view」这类短词条命中长句内部，造成中英混排
    strings = dict(sorted(strings.items(), key=lambda kv: -len(kv[0])))

    long_hit = 0
    for f in FILES:
        s = open(f, encoding="utf-8").read()
        o = s
        for en, zh in strings.items():
            s, n = replace_literals(s, en, zh)
            long_hit += n
        if s != o:
            open(f, "w", encoding="utf-8", newline="\n").write(s)

    short_hit = 0
    for f in FILES:
        s = open(f, encoding="utf-8").read()
        o = s
        for en, zh in SHORT.items():
            pat = re.compile(
                r"(\b(?:label|name|desc|text|title|heading|placeholder)\s*:\s*)(['\"])"
                + re.escape(en) + r"\2"
            )
            short_hit += len(pat.findall(s))
            s = pat.sub(lambda m: m.group(1) + m.group(2) + zh + m.group(2), s)
        if s != o:
            open(f, "w", encoding="utf-8", newline="\n").write(s)

    exact_hit = 0
    tpl_hit = 0
    for f in FILES:
        s = open(f, encoding="utf-8").read()
        o = s
        for a, b in PAIRS:
            if a in s:
                s = s.replace(a, b)
                exact_hit += 1
        if DIRECTIONS_DEF in s and "DIRECTION_LABELS" not in s:
            s = s.replace(DIRECTIONS_DEF, DIRECTIONS_DEF + DIRECTIONS_LABELS)
            tpl_hit += 1
        for a, b in TPL.items():
            if a in s:
                s = s.replace(a, b)
                tpl_hit += 1
        if s != o:
            open(f, "w", encoding="utf-8", newline="\n").write(s)

    print(f"源码文件 {len(FILES)} 个")
    print(f"长句 {long_hit} 处 | 短标签 {short_hit} 处 | 精确项 {exact_hit} 项 | 模板 {tpl_hit} 项")
    if long_hit == 0 and exact_hit == 0 and tpl_hit == 0:
        print("提示：未产生任何替换，可能当前源码已是汉化状态，或上游改版导致映射失效。")
    print("下一步：npm run build 验证，并检查 UI 是否仍有英文。")


if __name__ == "__main__":
    main()
