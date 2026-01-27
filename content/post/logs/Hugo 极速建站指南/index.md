---
title: Hugo 极速建站指南
description: 从零搭建个人博客并部署上线
image: cover.png
date: '2026-01-25T01:24:17+08:00'
lastmod: '2026-01-25T23:40:57+08:00'
categories: logs
tags:
    - Hugo
---

通过这篇指南，你将快速掌握 Hugo 的安装与基本建站流程，轻松搭建属于自己的个人博客。

## 准备工作

在开始之前，请确保你的系统已安装以下两款核心工具：[Git](https://git-scm.com/) 和 [Go](https://go.dev/)。Git 用于管理主题和部署，Go 则是 Hugo 构建和模块管理的基础。

你可以通过在终端运行以下命令来验证它们是否已安装，并检查版本：

```bash
git --version
go version
```

如果命令能正确返回版本信息，说明你已经准备就绪！

## 安装 Hugo

这里重点介绍安装 Hugo 的关键步骤。如需针对特定操作系统的详细说明，建议参考[Hugo 官方文档](https://gohugo.io/installation/)。

以 Linux 系统为例，使用 Snap 包管理器安装：

```bash
sudo snap install hugo --channel=extended/stable
```

**小提示：** Hugo 分为标准版和扩展版。扩展版内置了 LibSass 转译器，能将 Sass 语言转换为 CSS。许多现代 Hugo 主题依赖此功能，为了确保主题兼容性和功能完整，请务必安装扩展版。

安装完成后，运行以下命令检查 Hugo 版本：

```bash
hugo version
```

如果一切顺利，你应该会看到类似下面的输出（版本号可能不同，请确认包含 `extended` 关键词）：

```bash
hugo v0.152.2-6abdacad3f3fe944ea42177844469139e81feda6+extended linux/amd64 BuildDate=2025-10-24T15:31:49Z VendorInfo=snap:0.152.2
```

## Hugo 建站

现在 Hugo 已经安装完毕，是时候迈出搭建个人博客的第一步了！

### 新建项目

首先，在终端中输入以下命令，创建一个全新的 Hugo 站点项目：

```bash
hugo new site <你的站点名称> --format yaml
```

将 `<你的站点名称>` 替换为你希望的项目文件夹名（例如 `my-blog`）。运行后，Hugo 会自动创建一个同名文件夹，包含博客的基本目录结构：

```txt
.
├── archetypes      # 文章模板存放地
├── assets          # 全局资源文件（可进行管道处理）
├── content         # 网站的核心内容，如文章、页面等
├── data            # 存放自定义数据文件
├── i18n            # 多语言站点翻译文件
├── layouts         # 定义网站页面布局的模板文件
├── static          # 存放图片、CSS、JS 等静态资源
├── themes          # 存放你选择的 Hugo 主题
└── hugo.yaml       # 整个站点的核心配置文件
```

至此，博客的基本框架已搭建完成，接下来我们要为它穿上漂亮的“外衣”——导入主题！

### 导入主题

Hugo 拥有庞大而活跃的主题社区。你可以访问 [Hugo Themes](https://themes.gohugo.io/) 官网挑选喜欢的主题。请注意，每个主题的安装配置方式略有不同，建议仔细阅读所选主题的官方文档。

这里以 [Stack](https://github.com/CaiJimmy/hugo-theme-stack) 主题为例，演示如何通过 `git submodule` 方式安装：

首先，进入刚创建的站点目录：

```bash
cd <你的站点名称>
```

如果你的项目目录还不是 Git 仓库，需先初始化：

```bash
git init
```

然后，使用 `git submodule` 命令将 Stack 主题添加到 `themes` 文件夹中：

```bash
git submodule add --depth=1 https://github.com/CaiJimmy/hugo-theme-stack/ themes/hugo-theme-stack
```

最后，在站点根目录下的 `hugo.yaml` 配置文件中，指定你希望使用的主题：

```yaml
# hugo.yaml
theme: 'hugo-theme-stack'
```

保存 `hugo.yaml` 文件，恭喜你，主题导入工作已完成！

### 配置与构建

在正式构建之前，为了直观了解主题配置，我们可以先使用 Stack 主题提供的示例配置和内容。这样能立即看到效果，便于后续根据需求修改。

在站点根目录执行以下命令：

```bash
cd <你的站点名称>
cp ./themes/hugo-theme-stack/exampleSite/hugo.yaml ./hugo.yaml
cp -r ./themes/hugo-theme-stack/exampleSite/content ./
```

现在，是时候构建你的站点了！在项目根目录运行 `hugo` 命令：

```bash
hugo
```

`hugo` 命令会编译站点内容和模板，将生成的静态文件输出到 `public` 目录。同时通常会创建 `resources` 目录，存放处理后的缓存文件（如优化后的 CSS 和图片）。

### 本地预览网页

构建完成后，可以在本地启动服务器预览博客。在项目目录执行：

```bash
hugo server
```

默认情况下，Web 服务器将在 [http://localhost:1313/](http://localhost:1313/) 启动。在浏览器中访问该地址，就能看到你的博客啦！

`hugo server` 内置了强大的 LiveReload 功能。服务器运行期间，若修改了源文件（如文章、模板、配置等），它会自动重新构建并刷新浏览器页面。这意味着你可以实时预览每一次改动，极大提升开发效率！

**小提示：** 极少数情况下，如果浏览器缓存导致改动未显示，可尝试使用 `Ctrl+F5` 强制刷新页面。

### 创建你的第一篇文章

Hugo 文章采用 Markdown 格式编写。你可以使用以下命令创建新文章：

```bash
hugo new post/my_first_article.md
```

该命令会在 `./content/post` 路径下创建 `my_first_article.md` 文件。打开文件，你会发现其中已预填了一些内容（YAML Front Matter），这部分内容由 `archetypes/default.md` 模板生成，你可以根据需要修改模板。

至此，你已成功搭建了一个可在本地访问的 Hugo 博客，并学会了如何创建文章。接下来，我们将探讨如何将博客部署到线上，让全世界都能看到！

## 部署到 Github Pages

将 Hugo 站点部署到 GitHub Pages，配合 GitHub Actions 自动化流程，你将拥有一个高效、稳定且易于维护的个人博客。
如需深入了解，可参考 [GitHub Pages 托管指南](https://gohugo.io/hosting-and-deployment/hosting-on-github/)。

### 创建网站仓库

首先，登录 GitHub 并新建仓库。仓库名称设为 `你的用户名.github.io`，可见性设为 Public。

### 将本地项目链接到远程仓库

创建好远程仓库后，需将本地 Hugo 项目链接到该 GitHub 仓库。

确保当前工作目录为 Hugo 站点根目录，然后执行以下 Git 命令：

```bash
# 将本地仓库与远程仓库关联
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
# 将当前分支重命名为 main (如果默认不是main的话)
git branch -M main
# 添加所有文件到暂存区
git add .
# 提交你的更改
git commit -m "feat: first commit of Hugo site"
# 推送你的更改到远程仓库，并设置上游分支
git push --set-upstream origin main
```

### 配置 Github Pages 设置

代码推送完成后，前往 GitHub 仓库页面进行 Pages 设置：

1. 点击导航栏顶部的 `Settings` 选项卡。
2. 在左侧侧边栏中，向下滚动并找到并点击 `Pages`。
3. 在 `Build and deployment` 部分，将 `Source` 选项从 `Deploy from a branch` 改为 `GitHub Actions`。

![Github Pages Settings](pic1.png)

### 新增 GitHub Actions 部署工作流文件

接下来添加 GitHub Actions 配置文件。该文件定义了自动化工作流，每次推送到 `main` 分支时，会自动构建 Hugo 站点并部署到 GitHub Pages。

在 Hugo 站点根目录下，创建 `.github/workflows` 文件夹，并在其中新建 `hugo.yaml` 文件。

将以下内容复制粘贴到 `.github/workflows/hugo.yaml` 文件中（注意调整 `HUGO_VERSION`）：

```yaml
name: Deploy Hugo site to Pages

on:
  # 在 main 分支有代码推送时触发
  push:
    branches:
      - main
  workflow_dispatch:

# 设置 Github Pages 所需权限
permissions:
  contents: read
  pages: write
  id-token: write

# 设置并发策略
concurrency:
  group: "pages"
  cancel-in-progress: false

# 默认使用 bash
defaults:
  run:
    shell: bash

jobs:
  # 构建作业
  build:
    runs-on: ubuntu-latest
    env:
      # 请根据你实际的 Hugo 版本进行调整
      HUGO_VERSION: 0.152.2
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: ${{ env.HUGO_VERSION }}
          extended: true

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"

      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 推送工作流文件并观察部署

保存 `hugo.yaml` 文件，提交并推送到 GitHub：

```bash
git add .github/workflows/hugo.yaml
git commit -m "feat: Add GitHub Actions workflow for Hugo deployment"
git push
```

推送成功后，进入 GitHub 仓库的 `Actions` 标签页。你会看到名为 "Deploy Hugo site to Pages" 的工作流正在运行。点击它可查看执行进度和日志。

![Github Pages Actions](pic2.png)

工作流完成后，通常需等待几分钟（GitHub Pages 部署可能有延迟），你的博客即可通过 `https://你的用户名.github.io` 访问！

## 参考资料

- [入门指南 | Hugo官方文档](https://hugo.opendocs.io/getting-started/)
- [Getting Started | Stack](https://stack.jimmycai.com/guide/getting-started)
