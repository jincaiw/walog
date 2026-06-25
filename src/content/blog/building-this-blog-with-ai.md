---
title: "基于 Astro 在 GitHub Pages 上构建个人博客"
description: "记录用 pi coding agent 从空目录开始搭建这个博客的完整过程——技术选型、实际踩坑以及最终效果。"
publishDate: "2026-06-25"
tags: ["博客", "Astro", "AI"]
featured: true
---

## 起因

一直想有一个自己的博客。之前要么觉得麻烦，要么写到一半搁置了。这次干脆让 AI 从头到尾帮我搭一个。

需求很明确：

- 纯静态，不依赖数据库
- Markdown 写文章，存在 Git 里
- 简洁好看，移动端也能用
- 支持搜索、标签、RSS
- 免费部署，自定义域名
- 以后加文章只要新建一个 .md 文件

## 技术选型

选型过程基本是 AI 推荐的，我确认了一下就定了：

| 组件 | 选择 | 理由 |
|------|------|------|
| 框架 | Astro 6 | 天然支持 Markdown，静态输出，JS 极少 |
| 样式 | Tailwind CSS 4 | 实用优先，写起来快 |
| 搜索 | Pagefind | 静态全文索引，不需要后端 |
| 部署 | GitHub Pages | 免费，配合 Actions 自动发布 |
| 域名 | mujizi.com | 已经有的域名，直接用 |

没有用 React、Vue 这些前端框架，博客嘛，内容优先。

## 搭建过程

整个搭建过程基本是 AI 帮我完成的，我只需要确认方向、检查结果。

### 第一步：初始化项目

从空目录开始，AI 创建了所有必要的配置文件：

- `package.json` — 依赖管理
- `astro.config.ts` — Astro 配置，包括 Tailwind、Sitemap 集成
- `tsconfig.json` — TypeScript strict 模式
- `src/content.config.ts` — 文章内容模型（Zod 校验）

### 第二步：设计页面

AI 生成了所有核心页面：

- **首页** — 博客名称、简介、精选文章、最新文章、标签入口
- **文章列表** — 分页、日期、标签
- **文章详情** — 目录、代码高亮、复制按钮、上一篇/下一篇
- **标签页** — 标签汇总 + 每个标签的文章列表
- **归档页** — 按年份归档
- **搜索页** — Pagefind 全文搜索
- **关于页** — 个人信息
- **404 页** — 友好的错误提示

### 第三步：样式与体验

视觉上追求简洁清晰：

- 系统字体栈，不加载外部字体
- 深色模式，跟随系统 + 手动切换，没有闪烁
- 响应式布局，手机和桌面都可用
- `prefers-reduced-motion` 尊重用户偏好

### 第四步：SEO 与订阅

- RSS 自动生成
- Sitemap 自动生成
- robots.txt 指向正确的 Sitemap 地址
- Open Graph / Twitter Card 社交分享
- JSON-LD 结构化数据

### 第五步：CI/CD

GitHub Actions 配置好之后，每次推送自动构建、索引、部署：

```
push → checkout → astro build → pagefind index → deploy to Pages
```

## 踩坑记录

搭建过程也不是完全顺利，遇到了一些问题：

### 1. Content Layer API 的渲染方式

Astro 6 的内容层 API 和之前的版本不太一样。文章渲染需要用 `render()` 从 `astro:content` 导入，而不是在文章对象上调用 `.render()`。一开始没注意，构建时报了 `post.render is not a function`，查了一下才改过来。

### 2. 中文标签的 URL 编码

标签包含中文时，URL 编码处理要小心。`getStaticPaths` 里不能自己 `encodeURIComponent`，否则路由匹配不上。Astro 会自动处理编码和解码。

### 3. 包管理器版本冲突

一开始指定了 npm 全局装的 pnpm 版本，但 registry 上没有那个版本，corepack 报错。改成已发布的版本号就好了。

### 4. 自定义域名冲突

`mujizi.com` 之前绑在其他仓库上，需要在旧仓库解绑后才能给新博客用。解绑之后在 GitHub 设置里配一下就行，HTTPS 证书会自动签发。

## 最终效果

博客跑起来之后，用 `curl` 把所有页面扫了一遍：

```
18 个页面全部 200
RSS、Sitemap 正常
Pagefind 索引 3 篇文章，906 个词
GitHub Actions 自动部署成功
```

从空目录到上线，历时不到一小时，大部分工作是 AI 完成的。我只做了确认、调整和域名配置。

## 一些想法

用 AI 搭博客这件事本身挺有意思的。以前搭博客要自己查文档、配环境、调样式，折腾好几天。现在说清楚需求，AI 直接生成代码，有问题还能当场修。

但这不意味着 AI 完全替代了人的判断。比如设计风格的选择——要简洁还是要华丽，哪些功能是必要的哪些可以砍掉，这些还是需要人来做决定。

工具进步让搭建博客的门槛降到了几乎为零。真正重要的还是——能不能持续写下去。

希望这个博客能活下来。
