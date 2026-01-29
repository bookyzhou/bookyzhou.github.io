---
title: Hugo 配置指南
description: 手把手教你打造个性化博客
image: cover.png
date: '2026-01-28T10:30:21+08:00'
lastmod: '2026-01-29T16:31:53+08:00'
categories: logs
tags:
    - Hugo 建站基础
---

本文将带你深入了解 Hugo 的配置系统。我们将以 **Stack** 主题为例，手把手教你如何调整站点信息、定制主题参数、管理导航菜单以及创建特殊页面。

## 配置基础

在开始之前，我们需要了解 Hugo 配置文件的基本规则。

Hugo 支持 TOML、YAML 和 JSON 三种格式的配置文件。在之前的教程中，我们通过 `hugo new site <你的站点名称> --format yaml` 指令选择了 **YAML** (`hugo.yaml`)。因为它在保持简洁的同时，拥有极佳的可读性，本文也将以 YAML 格式为例进行讲解。

Hugo 提供了两种配置管理方式，你可以根据项目规模和个人偏好进行选择。

### 单文件配置

所有的配置都写在根目录下的 `hugo.yaml` 中。例如，配置主题参数 `params`：

```yaml
# hugo.yaml
params:
  mainSections:
  - post
```

这种方式适合配置项较少的简单站点。

### 配置目录

将配置拆分到 `config/_default/` 目录下。例如，创建一个 `params.yaml` 专门存放主题参数：

```yaml
# params.yaml
mainSections:
- post
```

此时，你的目录结构如下：

```txt
.
├── config
│   └── _default
│       ├── hugo.yaml      # 基础站点配置
│       └── params.yaml    # 主题参数配置
```

Hugo 会自动合并这些文件。这种结构清晰明了，非常利于后期维护，**强烈推荐使用**。关于配置目录的更多细节，可以参考 [配置目录｜Hugo 官方文档](https://hugo.opendocs.io/getting-started/configuration/#%e9%85%8d%e7%bd%ae%e7%9b%ae%e5%bd%95)。

> **小提示**：在进行配置修改时，建议始终保持 `hugo server` 运行。大多数修改都能实时预览，如果遇到样式错乱或不生效的情况，尝试重启服务或手动删除 `public` 文件夹后重新构建。

本文只介绍最常用的核心配置项。如果你需要查阅所有可用的配置选项，请参考 [Hugo 官方文档 - 配置说明](https://gohugo.io/configuration/all/)。

## 基础站点配置

基础配置决定了站点的核心属性，如标题、链接结构和语言设置。这些配置通常位于 `config/_default/hugo.yaml` 文件中。

以下是一份推荐的基础配置清单。你可以直接复制到你的 `hugo.yaml` 中，并根据注释修改 `title`、`baseURL` 等关键信息。

```yaml
# hugo.yaml
# 站点基础信息
baseURL: "https://my_user_name.github.io/" # 你的博客地址（必填）
title: "My Blog"                           # 浏览器标签页显示的标题
copyright: "My Blog"                       # 页脚版权信息
theme: "hugo-theme-stack"                  # 使用的主题名称

# 语言与地区
languageCode: "zh-cn"           # 语言代码，影响 RSS 和浏览器识别
DefaultContentLanguage: "zh-cn" # 默认内容语言
hasCJKLanguage: true            # 开启中日韩语言支持（准确统计字数）
timeZone: "Asia/Shanghai"       # 设置时区

# 小提示：Hugo 默认不会发布“未来时间”的文章。
# 如果你的时区设置不正确，可能会导致刚发布的文章无法显示。

# 分页设置
pagination:
  pagerSize: 5 # 每页显示的文章数量

# 链接结构
# 决定了文章页面的 URL 格式。推荐使用 :slug，既美观又利于 SEO。
permalinks:
  post: /p/:slug/ # 例如：https://site.com/p/my-first-post/
  page: /:slug/   # 例如：https://site.com/about/

# 相关文章推荐
related:
  includeNewer: true # 允许推荐更新的文章
  threshold: 60      # 关联度阈值（0-100），越低推荐越宽泛
  toLower: false     # 关键词大小写敏感
  indices:
    - name: tags
      weight: 100 # 标签权重
    - name: categories
      weight: 200 # 分类权重

# Markdown 渲染引擎配置
markup:
  goldmark:
    renderer:
      unsafe: true # 允许在 Markdown 中直接写 HTML
    extensions:
      passthrough:
        enable: true # 启用数学公式支持 (LaTeX)
        delimiters:
          block:
            - ["\\[", "\\]"]
            - ["$", "$"]
          inline:
            - ["\\(", "\\)"]

  # 目录
  tableOfContents:
    startLevel: 2 # 从 H2 开始生成目录
    endLevel: 4   # 到 H4 结束
    ordered: true # 使用有序列表 (1. 2. 3.)

  # 代码高亮
  highlight:
    noClasses: false       # 使用内联样式
    codeFences: true       # 支持 ``` 语法
    guessSyntax: true      # 自动检测语言
    lineNos: true          # 显示行号
    lineNumbersInTable: true # 复制时忽略行号
    tabWidth: 4            # Tab 缩进宽度
```

## 主题参数配置

Hugo 的强大之处在于其丰富的主题生态，而 `params` 则是控制主题外观和功能的指挥棒。不同的主题拥有不同的参数集，本文以 **Stack** 主题为例进行讲解。

### 配置文件示例

建议在 `config/_default/` 目录下创建 `params.yaml` 文件，将以下配置复制进去。

> **注意**：请务必修改 `favicon`（网站图标）和 `sidebar.avatar.src`（头像）的路径。

```yaml
# params.yaml
# --- 核心内容配置 ---
mainSections:
  - post           # 首页列表中显示哪个目录下的内容（通常是 post）
featuredImageField: image # 文章封面图片的 Front Matter 字段名
rssFullContent: true      # RSS 是否输出全文（建议开启，方便读者订阅）
favicon: /favicon.png     # 网站图标 (需存放在 static/favicon.png)

# --- 页脚信息 ---
footer:
  since: 2026      # 建站年份
  customText: ""   # 自定义页脚文字

# --- 日期格式化 ---
dateFormat:
  published: "2006-01-02"      # 发布日期格式 (例如 2024-01-28)
  lastUpdated: "2006-01-02 15:04" # 更新日期格式

# --- 侧边栏 ---
sidebar:
  subtitle: "Stay Hungry, Stay Foolish" # 头像下方的副标题
  avatar:
    enabled: true
    local: true      # true: 使用本地图片; false: 使用外链
    src: /img/avatar.png # 头像路径 (需存放在 static/img/avatar.png)

# --- 文章页面 ---
article:
  math: false          # 是否启用数学公式 (KaTeX/MathJax)
  toc: true            # 是否显示目录
  readingTime: true    # 显示预计阅读时间
  license:
    enabled: true
    default: "CC BY-NC-SA 4.0" # 默认版权协议

# --- 侧边栏小部件 ---
widgets:
  homepage:            # 首页显示的部件
    - type: search     # 搜索框
    - type: archives   # 归档
      params:
        limit: 5
    - type: categories # 分类
      params:
        limit: 10
    - type: tag-cloud  # 标签云
      params:
        limit: 10
  page:                # 文章页显示的部件
    - type: toc        # 目录 (Table of Contents)

# --- 个性化设置 ---
colorScheme:
  toggle: true     # 显示深色/浅色模式切换按钮
  default: auto    # 默认模式 (auto/light/dark)

imageProcessing:
  cover:
    enabled: true  # 启用封面图自动处理
  content:
    enabled: true  # 启用正文图片自动处理
```

### 资源路径说明

在 Hugo 中，`static` 目录下的文件在构建时会被直接复制到网站根目录。因此，引用资源时应直接以 `/` 开头：

- 如果你的头像文件位于 `static/img/avatar.png`，配置中应填写 `/img/avatar.png`。
- 如果你的图标文件位于 `static/favicon.png`，配置中应填写 `/favicon.png`。

## 菜单配置

清晰的导航是提升用户体验的关键。Hugo 的菜单系统非常灵活，支持通过配置文件统一管理，也可以在文章的 Front Matter 中单独定义。为了便于维护，我们**强烈推荐**使用配置文件进行统一管理。

### 统一管理

在 `config/_default/` 目录下创建 `menu.yaml` 文件。Stack 主题主要包含两个菜单区域：左侧的主导航菜单和社交链接。

以下是一个标准的配置示例：

```yaml
# menu.yaml
# --- 主导航菜单 ---
main:
  - identifier: Home     # 唯一标识符
    name: 主页           # 显示的文字
    url: /               # 跳转链接 (内部链接以 / 开头)
    weight: 1            # 排序权重 (数字越小越靠前)
    params:
      icon: home         # 图标名称 (对应 assets/icons/home.svg)

  - identifier: Search
    name: 搜索
    url: /search/
    weight: 3
    params:
      icon: search

  - identifier: Archives
    name: 归档
    url: /archives/
    weight: 2
    params:
      icon: archives

  - identifier: About
    name: 关于
    url: /about/
    weight: 4
    params:
      icon: user

  - identifier: Links
    name: 友链
    url: /links/
    weight: 5
    params:
      icon: link

# --- 社交链接 ---
social:
  - identifier: github
    name: GitHub
    url: https://github.com/bookyzhou  # 外部链接
    weight: 1
    params:
      icon: brand-github

  - identifier: rss
    name: RSS
    url: /index.xml      # RSS 订阅地址
    weight: 2
    params:
      icon: rss
```

**关键字段解析：**

- **identifier**: 菜单项的唯一 ID。
- **weight**: 决定菜单的排列顺序，数字越小越靠前。
- **url**:
  - **内部链接**: 以 `/` 开头，例如 `/about/`。
  - **外部链接**: 完整的 URL，例如 `https://github.com`。
- **params.icon**: 图标设置，例如配置 `icon: user`，主题会自动加载 `assets/icons/user.svg`。
  - **自定义图标**: 如果需要新增图标，可以在 [Tabler Icons](https://tabler.io/icons) 下载 SVG 文件，并放入 `assets/icons/` 目录（如果目录不存在请自行创建），然后在配置中引用文件名（不带后缀）即可。Hugo 会优先使用你站点目录下的图标。

### Front Matter 配置

除了统一配置文件，你也可以直接在页面文件（如 `content/about/index.md`）的头部进行配置：

```yaml
---
title: "关于"
menu:
  main:
    weight: 4
    params:
      icon: user
---
```

这种方式的优点是配置与内容紧耦合，但缺点是当菜单项较多时，难以概览整体结构。因此，除非是临时性的页面，否则**不推荐**这种方式。

> **下一步**：配置好菜单后，点击链接可能会出现 404 错误。这是因为我们还没有创建对应的页面文件（如 `about.md` 或 `archives.md`）。别担心，我们将在下一节“特殊页面配置”中解决这个问题。

## 特殊页面配置

在上一节中，我们配置了“归档”、“搜索”和“关于”等菜单项。但如果你现在点击它们，大概率会看到 `404 Not Found` 错误。这是因为我们只是设置了**入口**，却还没有创建对应的**页面文件**。

在 Hugo 中，这些非文章类的页面通常存放在 `content/page/` 目录下。下面我们将逐一创建它们。

### 核心概念：Slug 与 Layout

在创建页面之前，有两个 Front Matter 参数需要特别了解：

- **slug**: 用于自定义页面的 URL 路径。
  - 默认情况下，Hugo 会使用文件名或标题作为 URL。
  - 如果你希望标题是中文（如“关于”），但 URL 是英文（`/about/`），就需要设置 `slug: about`。
- **layout**: 指定页面使用的布局模板。
  - 普通页面（如“关于”）使用默认的文章布局。
  - 功能页面（如“归档”、“搜索”）需要指定特定的 `layout`，以便主题调用对应的代码逻辑。

### 创建“关于”页面 (About)

这是一个标准的普通页面，用于介绍你自己。

创建文件：`content/page/about/index.md`

```yaml
---
title: "关于"
description: "这里是关于我的介绍"
slug: "about"       # 确保 URL 为 /about/
date: 2026-01-29
readingTime: false  # 不需要显示阅读时间
---

这里写上你的自我介绍...
```

### 创建“归档”页面 (Archives)

归档页面会自动列出你所有的文章，按年份排序。这是通过 Stack 主题内置的 `archives` 布局实现的。

创建文件：`content/page/archives/index.md`

```yaml
---
title: "归档"
slug: "archives"    # 确保 URL 为 /archives/
layout: "archives"  # 关键：调用归档布局
---
```

> **注意**：归档页面的正文内容通常会被忽略，因为它是由模板自动生成的。

### 创建“搜索”页面 (Search)

Stack 主题支持本地搜索功能，同样需要一个专门的页面来承载。

创建文件：`content/page/search/index.md`

```yaml
---
title: "搜索"
slug: "search"      # 确保 URL 为 /search/
layout: "search"    # 关键：调用搜索布局
---
```

### 创建“友链”页面 (Links)

如果你想展示友链，可以创建一个包含特定 Front Matter 的页面。Stack 主题通常通过读取数据文件或 Front Matter 中的 `links` 字段来生成友链。

创建文件：`content/page/links/index.md`

```yaml
---
title: "友链"
slug: "links"
date: 2026-01-29
links:
  - title: GitHub
    description: GitHub is the world's largest software development platform.
    website: https://github.com
    image: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
  - title: Hugo
    description: The world’s fastest framework for building websites.
    website: https://gohugo.io
    image: https://gohugo.io/img/hugo-logo.png
---
```

## 总结

至此，你的博客已经具备了完整的骨架：

1. **基础配置** (`hugo.yaml`) 确立了站点身份。
2. **主题参数** (`params.yaml`) 赋予了站点个性。
3. **菜单导航** (`menu.yaml`) 串联起了各个板块。
4. **特殊页面** (`content/page/*.md`) 丰富了站点功能。

接下来，你可以专注于创作内容，或者继续探索更多 Hugo 的高级玩法。祝你写作愉快！

## 参考资料

- [Stack 配置](https://stack.jimmycai.com/zh/config/)
- [Hugo 官方文档 - 配置说明](https://gohugo.io/configuration/all/)
- [配置目录｜Hugo 官方文档](https://hugo.opendocs.io/getting-started/configuration/#%e9%85%8d%e7%bd%ae%e7%9b%ae%e5%bd%95)
- [菜单｜Hugo 官网文档](https://hugo.opendocs.io/content-management/menus/)
