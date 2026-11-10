> [!NOTE]
> **简体中文版（非官方汉化）**
>
> 本仓库是 [Advanced Canvas](https://github.com/Developer-Mike/obsidian-advanced-canvas) **v7.1.2** 的简体中文分支，汉化了界面文案与本文档，不涉及任何功能逻辑改动。
>
> - 下载：见 [Releases](https://github.com/lichong0429/Obsidian-Advanced-Canvas/releases)，取 `main.js`、`styles.css`、`manifest.json` 三个文件
> - 汉化机制、覆盖范围与已知边界：[HANHUA.md](HANHUA.md)
> - 英文原文文档：[README.en.md](README.en.md)
> - 上游版权归 Developer-Mike 所有，本分支同样遵循 GPL-3.0

---

<h3 align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/logo-dark.png">
        <img alt="Logo" src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/logo-light.png" width="100">
    </picture><br/><br/>
    Advanced Canvas for <a href="https://obsidian.md">Obsidian.md</a>
</h3>

<div align="center">
    <a href="https://github.com/Developer-Mike/obsidian-advanced-canvas/stargazers"><img src="https://img.shields.io/github/stars/Developer-Mike/obsidian-advanced-canvas?colorA=363a4f&colorB=e0ac00&style=for-the-badge" alt="GitHub star count"></a>
    <a href="https://github.com/Developer-Mike/obsidian-advanced-canvas/issues"><img src="https://img.shields.io/github/issues/Developer-Mike/obsidian-advanced-canvas?colorA=363a4f&colorB=e93147&style=for-the-badge" alt="Open issues on GitHub"></a><br/>
    <a href="https://obsidian.md/plugins?id=advanced-canvas"><img src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json&query=$.advanced-canvas.downloads&label=Downloads&style=for-the-badge&colorA=363a4f&colorB=d53984"/></a>
    <a href="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=GPL-3.0&colorA=363a4f&colorB=b7bdf8" alt="GPL-3.0 license"/></a><br/><br/>
</div>

<div align="center">
    <b>⚡ 为你的白板体验加速！</b>可创建演示、流程图等！
</div>

---

> [!TIP]
> 如果你想在 Obsidian 里手写，或直接批注 PDF，可以看看 [Starlight PDF](https://starlight.by-mika.dev/)。

---

## 功能概览
本插件为 Obsidian 白板提供了一整套增强功能：

*   **核心增强：**
    *   [标准化格式](#标准化格式)：兼容 JSON Canvas 格式，并引入 Advanced JSON Canvas 格式以支持更多特性。
    *   [完整元数据缓存支持](#完整元数据缓存支持)：让白板接入 Obsidian 的关系图谱、出链与反向链接。
    *   [属性支持](#属性支持)：为白板文件添加自定义属性。
    *   [文件节点自动连线](#文件节点自动连线)：根据属性自动在文件节点之间创建连线。
    *   [单节点链接与嵌入](#单节点链接与嵌入)：在白板之外链接或嵌入白板中的单个节点。
    *   [更好的默认设置](#更好的默认设置)：自定义节点默认尺寸、网格对齐等。
    *   [增强只读模式](#增强只读模式)：更细致地控制只读模式下的白板交互。
    *   [增强图片导出](#图片导出)：导出 PNG/SVG，支持透明背景等选项。
*   **节点自定义：**
    *   [节点模板](#节点模板)：把节点样式保存为模板重复使用。
    *   [节点样式](#节点样式)：包含多种[流程图形状](#节点形状)、[边框样式](#边框样式)与文本对齐方式。
    *   [自动调整节点高度](#自动调整节点高度)：节点高度随内容自动适配。
    *   [可变断点](#可变断点)：按缩放级别控制内容是否渲染。
    *   [替代文本渲染](#替代文本渲染)：修复编辑模式与阅读模式渲染不一致的问题。
    *   [层级控制](#层级控制)：管理节点的叠放顺序。
    *   [自定义颜色](#自定义颜色)：向取色板添加自己的颜色。
*   **连线自定义：**
    *   [连线样式](#连线样式)：包含[路径样式](#路径样式)（点线、虚线）、[箭头样式](#箭头样式)与[寻路方式](#寻路方式)。
    *   [浮动连线](#浮动连线)：连线自动调整连接侧。
    *   [翻转连线](#翻转连线)：一键反转连线方向。
*   **交互与工作流：**
    *   [白板命令](#白板命令)：一整套用于高效操作白板的命令。
    *   [类原生文件搜索](#类原生文件搜索)：用熟悉的界面搜索白板内的文本。
    *   [演示模式](#演示模式)：像幻灯片一样创建与浏览演示。
    *   [PDF 批注](#pdf-批注)：直接在白板中批注 PDF。
    *   [传送门](#传送门)：在当前白板中嵌入其他白板。
    *   [可折叠分组](#可折叠分组)：用可折叠分组整理白板。
    *   [连线高亮](#连线高亮)：选中节点时高亮与之相连的连线。
    *   [连线选择](#连线选择)：选中与节点相连的连线。
    *   [专注模式](#专注模式)：弱化其他节点以突出单个节点。
    *   [封装所选内容](#封装所选内容)：把所选节点移入新白板并留下链接。
    *   独立于节点创建分组。
*   **样式与扩展性：**
    *   [自定义样式](#自定义样式)：用 CSS 为节点和连线添加独特样式。
    *   [白板事件](#白板事件)：向其他插件暴露白板事件。

所有功能都可以在设置中单独启用或关闭。

## 安装
打开设置中的「第三方插件」面板，搜索「Advanced Canvas」（或点[这里](https://obsidian.md/plugins?id=advanced-canvas)）。

> [!NOTE]
> 本仓库是汉化分支，未上架社区插件市场。安装汉化版请从 [Releases](https://github.com/lichong0429/Obsidian-Advanced-Canvas/releases) 下载，按下方「手动创建文件夹」步骤放入插件目录。

<details>
    <summary>其他安装方式</summary>

*   使用 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 安装
*   手动创建文件夹
    1.  在库的插件目录（`<vault>/.obsidian/plugins/`）中新建名为 `advanced-canvas` 的文件夹。
    2.  从最新 Release 下载 `main.js`、`styles.css` 与 `manifest.json`，放入该文件夹。
    3.  在「设置 → 第三方插件 → 已安装插件」中启用。
</details>

## 支持作者
欢迎支持这个插件 —— 背后是大量的开发时间与精力。最简单的两种方式是给仓库点个 ⭐，或在 [Ko-fi](https://ko-fi.com/X8X27IA08) 上随意打赏 ❤️。谢谢！

<a href="https://ko-fi.com/X8X27IA08" target="_blank">
    <img src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_beige.png" alt="Support me on Ko-fi" width="200"/>
</a>

## 术语说明
- **白板（Canvas）**：显示节点与连线的视图。
- **节点（Node）**：白板中的单个元素，可以包含文本、文件或链接。（也有人叫它*卡片*或*元素*，但请统一使用**节点**。）
  - **文本节点**：内容为文本的节点。
  - **文件节点**：内容为指向其他文件链接的节点。
  - **分组节点**：包含其他节点的节点。
  - **链接节点**：显示网页的节点。
- **连线（Edge）**：白板中两个节点之间的连接，用于表示元素之间的关系。（请统一使用**连线**，不要用*箭头*，以免与连线末端的箭头混淆。）
  - **连线路径**：连接两个节点的那条线。
  - **连线箭头**：位于连线末端（或起点）、表示连接方向的箭头。
- **弹出菜单（Popup Menu）**：选中一个或多个白板元素（节点或连线）后出现的横向菜单。
- **右键菜单（Context Menu）**：在白板视图中右键点击后出现的菜单。
- **控制菜单（Control Menu）**：白板视图右上角的竖向菜单。
- **卡片菜单（Card Menu）**：白板视图底部的横向菜单，其中的选项用于创建新节点。

## 标准化格式
本插件兼容 [JSON Canvas](https://github.com/obsidianmd/jsoncanvas) 格式，并通过 [Advanced JSON Canvas](https://github.com/Developer-Mike/obsidian-advanced-canvas/blob/main/assets/formats/advanced-json-canvas/README.md) 格式更进一步，提供了更多特性与灵活性。引入 Advanced JSON Canvas 格式的目的，是让用 Advanced Canvas 创建的白板具备长期可用性、可读性、互操作性与可扩展性。

## 完整元数据缓存支持
Advanced Canvas 让 `.canvas` 文件可以被元数据缓存索引。这意味着白板现在完整兼容关系图谱、出链与反向链接，把 Obsidian 的链接体系完整带到了白板文件格式上。

<details>
    <summary>元数据缓存支持示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/metadata-cache-support.png" alt="Metadata Cache Support Example"/>
</details>

<details>
    <summary>技术细节</summary>

*   `.canvas` 文件的文件缓存中，`hash` 键现在有值（由文件路径生成），而不再是空字符串。
    *   可通过 `app.metadataCache.fileCache[<filepath>]` 对象查看变化。
*   元数据缓存位于 `app.metadataCache` 对象中 —— 与 Obsidian 处理 Markdown 文件用的是同一个对象。
    *   例如 `app.metadataCache.getCache` / `app.metadataCache.getFileCache` 现在对 `.canvas` 文件也有效。
    *   元数据缓存条目中的 `position` 对象，对 `.canvas` 文件新增了 `nodeId` 键。
    *   `.canvas` 文件的元数据缓存条目新增 `nodes` 键，类型为 `{ [nodeId: string]: MetadataCacheEntry }` —— 这使其他插件可以访问单个节点的完整元数据缓存。`MetadataCacheEntry` 对象与 Markdown 文件所用的完全一致（甚至由同一函数生成，1:1 兼容）。
*   已解析链接对象中现在包含 `.canvas` 文件的条目。
    *   `app.metadataCache.resolvedLinks` 中针对 `.canvas` 文件的实现方式与 Markdown 文件完全相同。
</details>

### 属性支持
此外，Advanced Canvas 为 `.canvas` 文件引入了完整的属性（frontmatter）支持。现在你可以直接在白板视图中查看与编辑属性：

*   **打开属性：** 点击白板视图右上角的「info」图标。
*   **作用：** 可以为白板文件添加自定义属性（元数据）。
*   **典型用途：**
    *   **分类与标签：** 添加 `tags` 或自定义键用于组织管理。
    *   **别名：** 用 `aliases` 为白板文件创建别名。
    *   **样式：** 用 `cssclasses` 为整个白板视图应用自定义 CSS。
    *   **自定义元数据：** 定义任何契合你工作流的属性。
*   **可检索：** 白板属性中定义的字段可通过 Obsidian 全局搜索面板检索，进一步把白板融入你的知识管理体系。

这显著提升了在 Obsidian 中将白板与笔记一同管理、组织和定制的能力。

## 文件节点自动连线
Advanced Canvas 可以根据文件节点的属性自动创建它们之间的连线。默认（启用后）会依据 `canvas-edges` 属性中链接的文件创建连线。这样你就能在白板中的文件节点之间建立固定关系，便于呈现文件间的固定结构或关联。

### 单节点链接与嵌入
Advanced Canvas 现在支持把 `.canvas` 文件中*单个节点*的内容直接链接或嵌入到 Markdown 笔记中，让你可以细粒度地引用白板中的特定信息。（可用 `Advanced Canvas: Copy wikilink to node` 命令获取节点 id。）

*   **语法：**
    *   **链接：** 使用标准 wikilink 格式，在 `#` 后附加节点 ID：
        `[[canvas-file-name#node-id]]`
    *   **嵌入：** 使用标准嵌入 wikilink 格式，同样附加节点 ID：
        `![[canvas-file-name#node-id]]`
*   **作用：** 以这种方式链接或嵌入时，Markdown 文件中会显示或链接该节点在白板中的实际内容。对于引用图表、文本片段或白板节点中的其他内容，这非常实用。

## 更好的默认设置
*   强制所有新建节点对齐网格
*   自定义文本节点默认尺寸
*   自定义文件节点默认尺寸
*   调整节点最小尺寸
*   关闭字号随缩放级别变化

## 类原生文件搜索
用熟悉的搜索体验快速定位白板内的文本。Advanced Canvas 为白板内容集成了一个类原生的文件搜索。

*   **唤起方式：** 使用 `搜索当前文件` 命令，通常绑定在 `Ctrl+F`（macOS 为 `Cmd+F`）。
*   **作用：** 打开搜索界面，在当前白板的所有节点中检索文本。
*   **好处：** 在文本密集的白板中，快速定位信息、跳转到相关节点，提升效率。

<details>
    <summary>搜索示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-search.gif" alt="Search Example"/>
</details>

## 白板命令
<details>
    <summary>查看可用命令</summary>

*   `Advanced Canvas: 切换只读`
    *   切换白板的只读状态
*   `Advanced Canvas: 创建文本节点`
    *   新建文本节点
*   `Advanced Canvas: 创建文件节点`
    *   新建文件节点
*   `Advanced Canvas: 分组所选节点`
    *   在所选节点周围创建分组节点
*   `Advanced Canvas: 切换分组折叠`
    *   折叠/展开所选分组节点
*   `Advanced Canvas: 选择所有连线`
    *   选中所有连线
*   `Advanced Canvas: 缩放到所选内容`
    *   缩放到所选节点的边界框
*   `Advanced Canvas: 缩放以适应`
    *   缩放以显示所有节点
*   `Advanced Canvas: 向上/下/左/右导航`
    *   用上述命令在白板中导航
*   `Advanced Canvas: 向上/下/左/右克隆节点`
    *   按方向键方向克隆所选节点
    *   克隆出的节点与原节点尺寸、颜色一致
*   `Advanced Canvas: 向上/下/左/右扩展节点`
    *   按方向键方向扩展所选节点
*   `Advanced Canvas: 水平/垂直翻转所选内容`
    *   将所选节点及其连线水平或垂直翻转
*   `Advanced Canvas: 交换节点`
    *   互换两个所选节点（x、y 与宽、高互换）
*   `Advanced Canvas: 复制节点 wikilink`
    *   把所选节点的 wikilink 复制到剪贴板
*   `Advanced Canvas: 将出链拉入白板`
    *   为所选节点的所有出链创建文件节点；未选中节点时作用于整个白板
*   `Advanced Canvas: 将反向链接拉入白板`
    *   为所选节点的所有反向链接创建文件节点；未选中节点时作用于整个白板
</details>

## 节点模板
把节点样式保存为模板并重复使用，这样无需每次手动调整各样式属性，就能快速为新节点套用一致的样式。

在恰好选中**一个**节点时，可用 `Advanced Canvas: 将节点保存为模板` 命令将其保存为模板。选择模板图标后，模板会出现在卡片菜单（白板视图底部的横向菜单）中，方便快速套用到新节点。

要删除模板，在卡片菜单中右键该模板并选择 `移除`。

## 节点样式
可以在设置中自定义节点的默认样式，包括多种形状、边框样式与文本对齐方式。

### 节点形状
<details>
    <summary>流程图示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-flowchart.png" alt="Flowchart Example"/>
</details>

#### 用法
*   使用增强后的弹出菜单设置节点形状。

#### 形状
<details>
    <summary>端点形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/terminal.png" alt="Terminal Shape"/>
</details>

<details>
    <summary>处理/居中形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/process.png" alt="Process/Center Shape"/>
</details>

<details>
    <summary>判断形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/decision.png" alt="Decision Shape"/>
</details>

<details>
    <summary>输入/输出形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/input-output.png" alt="Input/Output Shape"/>
</details>

<details>
    <summary>页内引用形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/reference.png" alt="On-page Reference Shape"/>
</details>

<details>
    <summary>预定义流程形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/predefined-process.png" alt="Predefined Process Shape"/>
</details>

<details>
    <summary>文档形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/document.png" alt="Document Shape"/>
</details>

<details>
    <summary>数据库形状</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/flowchart-nodes/database.png" alt="Database Shape"/>
</details>

### 边框样式
可将边框设为点线、虚线或不可见。

<details>
    <summary>边框样式示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/border-styles.png" alt="Border Styles Example"/>
</details>

*（注：节点也支持文本对齐选项：左、中、右。）*

## 连线样式
可以在设置中自定义连线的默认样式。

### 路径样式
可将连线路径设为点线、短虚线或长虚线。

<details>
    <summary>连线路径样式示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/edge-path-styles.png" alt="Edge Path Styles Example"/>
</details>

### 箭头样式
可将箭头设为三角轮廓、半三角、细三角、菱形、菱形轮廓、圆形、圆形轮廓与平头。

<details>
    <summary>箭头样式示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/edge-arrow-styles.png" alt="Edge Arrow Styles Example"/>
</details>

### 寻路方式
可将连线的寻路方式设为默认、直线、直角或 A*。

<details>
    <summary>连线寻路方式示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/edge-pathfinding-methods.png" alt="Edge Pathfinding Methods Example"/>
</details>

## 自定义样式
可以很方便地为节点与连线添加自定义样式属性。这些属性会暴露在 `.canvas-node` 的 dataset（节点）或 `.canvas-edges path` 的 dataset（连线）上，可用 CSS 设置样式。节点样式还会暴露在节点编辑器的 iframe body dataset 上，并附带 `canvas-node-iframe-body` 类名，用于标识该 body 位于白板节点的 iframe 内。

1.  在库中创建一个新的 CSS 片段：
    *   进入 `设置 > 外观 > 向下滚动 > CSS 片段`，点击文件夹图标打开片段目录。
    *   新建一个 CSS 文件（例如 `my-fancy-node-style.css`）。
2.  添加自定义样式属性定义：
    *   打开该 CSS 文件并加入以下代码。格式必须是 **YAML**（写在 CSS 注释中），且必须包含与示例相同的键。选项数量可自行调整（至少需要一个选项）。`icon` 键应填入 [lucide.dev](https://lucide.dev/icons/) 中图标的 ID。
    *   若要做连线样式，把 `@advanced-canvas-node-style` 改为 `@advanced-canvas-edge-style`。
    ```css
    /* @advanced-canvas-node-style
    key: validation-state
    icon: hourglass # 可选
    label: 审核状态
    options:
      -
        label: 未标记
        value: null
        icon: circle-help

      -
        label: 已通过
        value: approved
        icon: circle-check

      -
        label: 待处理
        value: pending
        icon: circle-dot

      -
        label: 已驳回
        value: rejected
        icon: circle-x
    */
    ```

> [!IMPORTANT]
> 必须**有且仅有一个**选项的 `value` 为 `null`。

3.  添加 CSS 样式：
    *   在同一个（或其他）CSS 文件中，为自定义属性添加样式。
    ```css
    /* 通用结构 */
    .canvas-node[data-<你的自定义样式键>="<值>"] {
      /* 你的自定义样式 */
    }
    ```
    *   `validation-state` 的示例：
    ```css
    .canvas-node[data-validation-state] .canvas-node-content::after {
      content: "";
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1em;
    }

    .canvas-node[data-validation-state="approved"] .canvas-node-content::after {
      content: "✔️";
    }

    .canvas-node[data-validation-state="pending"] .canvas-node-content::after {
      content: "⏳";
    }

    .canvas-node[data-validation-state="rejected"] .canvas-node-content::after {
      content: "❌";
    }
    ```
4.  在 Obsidian 设置中**启用**该 CSS 片段，即可使用你的自定义样式属性。
    <details>
        <summary>弹出菜单中的效果</summary>
        <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/custom-style-attribute-example.png" alt="Custom Style Attribute Example"/>
    </details>

**完整自定义节点样式 CSS 文件示例见[此处](https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/example-custom-node-style.css)。**

## 可变断点
为节点添加断点，以指定在哪个缩放级别以下不再渲染该节点的内容。

> [!IMPORTANT]
> 出于性能考虑，自定义断点会被缓存，仅在白板重新加载时重新读取。CSS 片段的改动不会立即生效（需重新打开白板）。

在库中创建新的 CSS 片段（并在设置中启用）：
```css
/* 可使用任意 CSS 选择器（只要 .canvas-node 元素上定义了该 CSS 变量） */
.canvas-node[data-shape="pill"] {
    /* 内容不再渲染的缩放级别（缩放级别范围为 1 到 -4） */
    --variable-breakpoint: 0.5;
}
```

## 替代文本渲染
改变文本节点在阅读模式下的渲染方式，以修复编辑模式与阅读模式切换时节点[内容跳动](https://forum.obsidian.md/t/edit-mode-in-canvas-all-the-time/55681)的视觉差异。该功能默认关闭；启用后会**改变 Obsidian 默认的 Markdown 渲染**（非破坏性，且仅作用于白板视图中的文本节点）。

该方案基于 [`stdword` 的工作](https://github.com/stdword/obsidian13-canvas-smooth-cards)。

## 层级控制
使用右键菜单调整节点的层级顺序。

<details>
    <summary>层级控制示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/z-ordering-control.png" alt="Z-Ordering Control Example"/>
</details>

## 自定义颜色
向取色板添加自定义颜色。可用以下 CSS 片段添加：
```css
body {
    /* X 为颜色在调色板中的序号（1-6 已被 Obsidian 使用） */
    --canvas-color-X: rgb(0, 255, 0);
}
```

> [!IMPORTANT]
> 在 Obsidian `< 1.13` 版本中，颜色需写成逗号分隔的 RGB 数值（如绿色写作 `--canvas-color-X: 0, 255, 0;`），而不能用 CSS 颜色值（如 `green` 或 `#00ff00`）。

<details>
    <summary>调色板中的自定义颜色示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/custom-colors.png" alt="Custom Colors In Palette"/>
</details>

## 演示模式
在演示模式中，可用方向键或 PageUp/PageDown（兼容多数演示遥控器）在节点之间切换。幻灯片/节点之间用箭头连接；若一个节点有多条出向箭头，给箭头编号以定义跳转顺序。演示时白板处于只读模式（因此[增强只读模式](#增强只读模式)的功能同样生效）。按 `ESC` 或执行对应命令退出。可用 `Advanced Canvas: 继续演示` 从上次的幻灯片恢复。

<img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-presentation-simple.gif" alt="Presentation mode example"/>

<details>
    <summary>简单演示白板文件</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-presentation-simple.png" alt="Presentation canvas file"/>
</details>

### 更复杂的示例
<img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-presentation-complex.gif" alt="Complex presentation mode example"/>

<details>
    <summary>复杂演示白板文件</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-presentation-complex.png" alt="Complex presentation canvas file"/>
</details>

### 用法
*   **创建第一张幻灯片：**
    *   用增强后的弹出菜单把某个节点标记为第一张幻灯片。
    *   或者新建节点后通过卡片菜单标记。
*   **添加更多幻灯片：**
    *   用箭头连接各幻灯片。
    *   若要循环返回，给箭头编号以定义顺序。
    *   **提示：** 用增强后的卡片菜单可获得一致的幻灯片尺寸。
*   **控制演示：**
    *   开始：命令面板（`Advanced Canvas: 开始演示`）。
    *   切换：方向键。
    *   退出：`ESC` 键。

## PDF 批注
为 PDF 嵌入添加 `pinned=true` 参数，可只显示指定页面，从而实现可靠的单页嵌入与批注。使用 `Advanced Canvas: 插入用于批注的 PDF` 命令可为 PDF 每一页创建独立节点（锁定宽高比），或用 `Advanced Canvas: 固定 PDF 页面` 命令固定当前页。

## 传送门
在当前白板中嵌入其他白板，并与被嵌入的白板建立连线（箭头）。

<img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/sample-portal-usage.png" alt="Portal example"/>

### 用法
*   嵌入一个白板文件后，点击弹出菜单中的门形图标，将其作为传送门打开。

## 可折叠分组
折叠与展开分组，让白板保持整洁。

<details>
    <summary>可折叠分组示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/collapsible-groups.png" alt="Collapsible Groups Example"/>
</details>

## 图片导出
可将整个白板或所选内容导出为带透明背景的 PNG/SVG 图片。核心插件的导出选项（如「隐私模式」「显示标志」，后者已扩展为包含 Advanced Canvas 标志）同样可用。执行 `Advanced Canvas: 将白板导出为图片` 命令即可使用增强的导出选项。

<details>
    <summary>图片导出示例（SVG）</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/image-export-example.svg" alt="Image Export Example"/>
</details>

## 自动调整节点高度
当文本内容变化时自动调整节点高度。可通过增强后的弹出菜单为单个节点开启或关闭。

<details>
    <summary>自动调整节点高度示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/auto-node-resizing.gif" alt="Auto Node Resizing Example"/>
</details>

## 连线高亮
选中节点时高亮与之相连的连线，便于直观识别节点间的关系。

若要修改高亮连线的外观，需在自定义 CSS 片段中编辑 `is-focused` 类。

## 专注模式
弱化其他所有节点，以聚焦单个节点。

若已启用[连线高亮](#连线高亮)，与聚焦节点相连的连线不会被弱化。

<details>
    <summary>专注模式示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/focus-mode.png" alt="Focus Mode Example"/>
</details>

## 增强只读模式
*   禁用节点弹出菜单。
*   锁定白板位置。
*   锁定白板缩放。
*   仍保留缩放到边界框的交互（如缩放到所选内容、缩放以适应）。

### 用法
*   使用增强后的控制菜单切换这些功能（仅在白板处于只读模式时显示）。

## 封装所选内容
把当前所选内容移入新白板，并在当前白板中留下指向它的链接。

### 用法
1.  选中要封装的节点。
2.  通过右键菜单封装所选内容。
3.  或使用命令面板（`Advanced Canvas: 封装所选内容`）。

## 浮动连线
连线会自动把连接侧调整到最合适的一侧。
把连线拖到节点内指示的投放区域，即可让该连线变为浮动。

<details>
    <summary>浮动连线示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/floating-edge-example.png" alt="Floating Edges Example"/>
</details>

## 翻转连线
一键反转连线方向。

<details>
    <summary>翻转连线示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/flip-edge.gif" alt="Flip Edge Example"/>
</details>

## 连线选择
选中与所选节点相连的连线。

<details>
    <summary>选择相连连线示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/select-connected-edges.gif" alt="Select Connected Edges Example"/>
</details>

### 按方向选择
选中与所选节点相连的入边或出边。
注意：需启用设置项 `连线选择 > 按方向选择连线`。

<details>
    <summary>选择出边示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/select-outgoing-edges.gif" alt="Select Outgoing Edges Example"/>
</details>

<details>
    <summary>选择入边示例</summary>
    <img src="https://raw.githubusercontent.com/Developer-Mike/obsidian-advanced-canvas/main/assets/docs/select-incoming-edges.gif" alt="Select Incoming Edges Example"/>
</details>

## 白板事件
所有自定义事件都以 `advanced-canvas:` 为前缀，可用 `app.workspace.on` 监听（与 Obsidian 默认事件一致）。
事件列表见[此处](https://github.com/Developer-Mike/obsidian-advanced-canvas/blob/main/src/%40types/CustomWorkspaceEvents.d.ts)。

## 设置
所有功能都可以在设置中启用或关闭，且都尽可能提供了可自定义的选项。
