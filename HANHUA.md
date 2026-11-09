# 汉化说明（简体中文）

本分支把 [Advanced Canvas](https://github.com/Developer-Mike/obsidian-advanced-canvas) v7.1.2 的界面文案本地化为简体中文。

## 为什么是字符串替换

该插件**没有内置 i18n 层**：`src/` 中不存在 `i18n` / `locale` 模块，也没有语言包目录，所有界面文案直接硬编码在 TS 源码里。因此汉化只能改源码字符串，无法通过加载语言包实现。

为此本仓库提供 `i18n/apply-zh.py`，把「英文原文 → 中文译文」的映射批量应用到 `src/`，并保证：

- **只替换引号完整的字面量**，命令 ID（`copy-wikilink-to-node`）、设置键（`autoResizeNodeFeatureEnabled`）、CSS 类名一律不动；
- **幂等**，重复运行不会二次替换，也不破坏已有译文；
- 兼容源码的单引号风格与 `\'` 转义、模板字符串。

## 覆盖范围

共约 **370 条**文案：

| 区域 | 示例 |
|---|---|
| 设置页 | 分组标题（传送门、演示、可折叠分组…）、选项名、说明段落 |
| 命令面板 | 全部命令，含方向类「向上下左右克隆/扩展/导航节点」 |
| 节点与连线 | 右键菜单、弹出菜单、线型与箭头、方向（单向/双向/无方向） |
| 演示模式 | 开始/结束/继续、幻灯片切换、方向键与 PgUp/PgDn 提示 |
| 导出与搜索 | 导出弹窗、主题下拉、搜索框「查找…」、快捷键提示 |
| 其他 | 通知文案、样式表中的「起点」标记、文档按钮 |

## 刻意保留英文

- `A*`（寻路算法）、`wikilink`、`PDF` / `PNG` / `SVG` / `UTF-8` / `SHA-256` 等专有名词
- 全部 `console` 日志与调试输出（保留英文便于按关键字检索上游 issue）
- 键名：`Enter` / `Escape` / `PageUp` / `PageDown` / `ArrowUp` 等

## 目录

```
i18n/
├── apply-zh.py     # 汉化脚本（幂等，源码级）
└── strings.json    # 297 条长句映射表
```

## 构建与安装

```bash
npm install
npm run build      # 产出 main.js / styles.css

# 放入插件目录
<vault>/.obsidian/plugins/advanced-canvas/
├── main.js
├── manifest.json
└── styles.css
```

安装后在 Obsidian 中重载插件（`Ctrl+P` → Reload app without saving）即可看到中文界面。

## 上游更新后的维护

1. 把上游新版本同步进本仓库
2. 运行 `python i18n/apply-zh.py`
3. 关注输出统计：若「长句」命中数明显下降，说明上游改写了文案，需要把新英文补进 `strings.json` 后重跑
4. 构建后人工过一遍设置页与命令面板，确认无遗漏

## 已知边界

- **命令面板不再支持英文关键字检索**：命令名已中文，需输入中文（如「专注模式」而非 "focus"）。若希望保留英文检索，可删除 `strings.json` 中作为命令名的条目后重跑。
- 极少数文案由变量拼接，方向类命令已通过注入 `DIRECTION_LABELS` 常量处理；若上游重构该逻辑，脚本会报模板未命中。
- 汉化只影响界面显示，不改变任何行为、数据结构与 `.canvas` 文件格式。

## 许可与致谢

原项目版权归 [Developer-Mike](https://github.com/Developer-Mike) 所有，采用 **GPL-3.0**；本汉化分支沿用同一许可证，修改内容仅为界面文案。
