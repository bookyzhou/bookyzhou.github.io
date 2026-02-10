---
title: 【Hugo 进阶】添加文章字数统计功能
description: 实现文章字数统计显示，以及个性化展示样式
# img: cover.png
date: '2026-02-10T10:39:28+08:00'
lastmod: '2026-02-10T14:42:33+08:00'
categories: logs
tags:
    - Hugo 进阶
---

在这篇文章中，我们将通过几个简单的步骤，为你的博客添加文章字数统计功能，并配置个性化的展示样式。

## 开启 Hugo 统计配置

Hugo 本身内置了字数统计功能，我们只需要在配置文件中将其“激活”。

### 启用字数统计

在 `config/_default/params.yaml` 文件中，找到 `article` 配置项，确保 `wordCount` 为 `true`。

```yaml
# config/_default/params.yaml
article:
    wordCount: true
```

### 开启 CJK 语言支持

如果你的博客包含中文、日文或韩文（CJK），**必须**开启 `hasCJKLanguage` 选项。否则，Hugo 会按照英文单词的逻辑（空格分隔）来统计，导致中文字数统计偏少。

在 `config/_default/hugo.yaml` 中添加：

```yaml
# config/_default/hugo.yaml
hasCJKLanguage: true
```

## 修改主题模板

配置开启后，我们需要告诉 Hugo 在哪里显示这些内容。通常，我们将它放在文章标题下方的元信息区域。

打开 `layouts/partials/article/components/details.html` 文件。我们需要在 `footer` 区域中插入字数统计的代码。

为了方便定位，这里展示了 `footer` 部分的结构，请关注新增代码：

```html
{{/* ... 前面是变量定义 ... */}}
{{ $showWordCount := .Params.wordCount | default (.Site.Params.article.wordCount) }}

{{ if $showFooter }}
<footer class="article-time">
    {{/* 发布时间 */}}
    {{/* 最后更新时间 */}}
    {{ if $showWordCount }}
        <div>
            {{ partial "helper/icon" "file-description" }}
            <time class="article-time--wordcount">
                {{ T "article.wordCount" .WordCount }}
            </time>
        </div>
    {{ end }}
    {{/* 阅读时间 */}}
</footer>
{{ end }}
```

## 样式与文案定制

功能实现后，接下来优化视觉呈现效果。

### 准备图标

在上面的代码中，我们使用了名为 `file-description` 的图标。
请检查你的 `assets/icons` 目录下是否有 `file-description.svg` 文件。如果没有，你可以：

- 前往 [Tabler Icons](https://tabler.io/icons) 下载你喜欢的图标。
- 将下载的 `.svg` 文件放入 `assets/icons` 目录。

### 自定义文案

`{{ T "article.wordCount" .WordCount }}` 这行代码使用了 Hugo 的国际化（i18n）功能。我们需要在语言文件中定义具体的显示文本。

打开 `i18n/zh-cn.yaml`（如果你使用的是中文），添加或修改以下内容：

```yaml
# i18n/zh-cn.yaml
article:
    wordCount: "共 {{ .Count }} 字"
```

### 调整 CSS 样式

最后，我们来微调一下布局。Hugo Stack 主题支持通过 `assets/scss/custom.scss` 覆盖默认样式，这是最推荐的修改方式，不会影响主题原始文件。

该文件会在构建时追加到 CSS 末尾，从而覆盖原有样式，实现自定义效果。

在 `assets/scss/custom.scss` 中添加：

```scss
/* 优化文章元信息的布局 */
.article-time {
    gap: 20px; // 增加不同信息项之间的间距

    & > div {
        gap: 5px; // 控制图标和文本的间距
    }
}
```

## 参考资料

- [WordCount | Hugo 官方文档](https://hugo.opendocs.io/methods/page/wordcount/)
