# jason.wa的博客

记录日常生活、想法、脑洞、思考等。

基于 Astro 构建，静态部署于 GitHub Pages。

## 技术栈

- [Astro 7](https://astro.build) — 静态站点生成器
- [Tailwind CSS 4](https://tailwindcss.com) + [Typography](https://tailwindcss.com/docs/typography-plugin)
- [Pagefind](https://pagefind.app) — 静态全文搜索
- [GitHub Pages](https://pages.github.com) + [GitHub Actions](https://github.com/features/actions)

## 要求

- Node.js >= 22.12.0
- pnpm

```bash
npm install -g pnpm
```

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## 📝 发布标准流程

### 1. 创建文章

复制模板：

```bash
cp src/content/posts/_template.md src/content/posts/my-post.md
```

### 2. Frontmatter 字段

```yaml
---
title: "文章标题"
description: "文章摘要，会显示在列表页和搜索结果中"
pubDatetime: "2026-06-25"
modDatetime: "2026-06-25"       # 可选，更新日期
tags: ["标签1", "标签2"]         # 留空默认 ["others"]
draft: false                     # true=草稿，不发布
featured: false                  # true=精选，显示在首页最上方
---
```

> ⚠️ `pubDatetime` 和 `modDatetime` 必须用双引号包裹，格式 `"YYYY-MM-DD"`

### 3. 本地预览

```bash
pnpm dev
```

访问 `http://localhost:4321` 查看文章效果。

### 4. 类型检查 + 生产构建

```bash
pnpm build
```

此命令按顺序执行：

1. `astro check` — TypeScript 类型检查
2. `astro build` — 静态页面生成（输出到 `dist/`）
3. `pagefind --site dist` — 建立全文搜索索引

### 5. 提交发布

```bash
git add -A
git commit -m "feat: add post - 文章标题"
git push
```

推送后 GitHub Actions 自动构建并部署到 `https://mujizi.com`

### 完整流程（一行命令）

```bash
pnpm build && git add -A && git commit -m "feat: add post - 文章标题" && git push
```

## 📂 项目目录

```
walog/
├── astro-paper.config.ts          # 站点配置（标题、描述、社交链接等）
├── astro.config.ts                # Astro 构建配置
├── .github/workflows/deploy.yml   # CI/CD 自动部署
├── public/
│   ├── CNAME                      # 自定义域名
│   └── favicon.svg
└── src/
    ├── content/
    │   ├── posts/                 # 📄 文章存放处（.md）
    │   │   └── _template.md       # 文章模板
    │   └── content.config.ts      # 内容模型定义
    ├── components/                # UI 组件
    ├── layouts/                   # 页面布局
    ├── pages/                     # 路由页面
    │   ├── index.astro            # 首页
    │   ├── posts/                 # 文章列表 + 详情
    │   ├── tags/                  # 标签页
    │   ├── archives/              # 归档
    │   ├── search.astro           # 搜索
    │   ├── about.astro            # 关于
    │   └── 404.astro              # 404
    ├── styles/global.css          # 全局样式 + 设计变量
    ├── utils/                     # 工具函数（slugify、排序、过滤等）
    ├── i18n/                      # 中文国际化
    ├── config.ts                  # 运行时配置
    ├── types/config.ts            # 配置类型定义
    └── scripts/theme.ts           # 深色模式脚本
```

## 📖 写作指南

### 图片

图片放在 `public/` 目录或文章同目录下：

```
src/content/posts/
├── my-post/
│   ├── index.md
│   └── cover.png
```

在 Markdown 中引用：

```markdown
![图片描述](/my-post/cover.png)
```

### 代码块

````markdown
```javascript
console.log("支持语法高亮");
```
````

### 中文阅读优化

- 正文字号 17px，行高 1.85
- 字体栈优先加载 Noto Sans SC（系统字体）
- 段落间距 1.5em
- 阅读时间按中英文混合计算（中文 400 字/分钟，英文 200 词/分钟）

### 草稿和未来文章

- `draft: true` — 本地开发可见，生产构建跳过
- 发布时间晚于构建时间 15 分钟内的文章会发布，超过则跳过

### 标签规范

- 标签区分大小写，建议统一全小写英文或中文
- 多个标签用数组 `["标签1", "标签2"]`
- 自动去重，自动排序（按文章数量降序）

## 🔍 搜索

使用 Pagefind 实现静态全文搜索，构建时自动建立索引：

- 只索引带有 `data-pagefind-body` 属性的文章正文
- 导航、页脚、标签列表等公共区域不进入索引
- 开发环境不可用，构建后本地预览：`pnpm preview`
- 搜索页面在 `https://mujizi.com/search`

## 🌐 部署

推送到 `master` 分支自动触发 GitHub Actions 部署：

```yaml
push → actions/checkout → withastro/action → actions/deploy-pages
```

部署地址：

- 自定义域名：`https://mujizi.com`
- GitHub Pages：`https://jincaiw.github.io/walog/`

## 📡 RSS

- 地址：`https://mujizi.com/rss.xml`
- 自动包含所有已发布文章，按时间倒序
- 含 `<language>zh-CN</language>` 标识

## ⚙️ 配置

站点配置统一在 `astro-paper.config.ts` 中修改：

| 字段 | 说明 | 示例值 |
|------|------|--------|
| `site.title` | 博客标题 | `jason.wa的博客` |
| `site.description` | 博客描述 | `记录日常生活、想法、脑洞、思考等` |
| `site.author` | 作者名 | `jason.wa` |
| `site.lang` | 语言 | `zh-CN` |
| `site.url` | 部署 URL | `https://mujizi.com` |
| `posts.perPage` | 每页文章数 | `10` |
| `posts.perIndex` | 首页显示数 | `5` |
| `socials` | 社交链接 | GitHub、RSS |

## 🎨 深色模式

- 跟随系统偏好（`prefers-color-scheme`）
- 可手动切换（点击 Header 中的日月图标）
- 选择持久化到 `localStorage`
- 内联脚本防止 Flash of Unstyled Content
- 尊重 `prefers-reduced-motion`

## 常见问题

**搜索在 dev 模式不可用？**

Pagefind 只在生产构建后建立索引。使用 `pnpm preview` 预览包含搜索的完整站点。

**如何修改标签 slug？**

标签 slug 由 `lodash.kebabcase` 生成，中文标签保留原字符。
