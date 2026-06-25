# Walog — 王记

个人技术博客，基于 Astro 构建，静态部署于 GitHub Pages。

## 技术栈

- [Astro 6](https://astro.build) — 静态站点生成器
- [Tailwind CSS 4](https://tailwindcss.com) — 实用优先的 CSS 框架
- [Pagefind](https://pagefind.app) — 静态全文搜索
- [GitHub Pages](https://pages.github.com) — 托管与部署
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## 要求

- Node.js >= 22.12.0
- pnpm（项目使用 pnpm 管理依赖）

## 本地启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查
pnpm check

# 生产构建（包含 Pagefind 索引）
pnpm build

# 预览生产构建
pnpm preview
```

## 创建文章

在 `src/content/blog/` 下创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章摘要"
publishDate: "2026-06-25"
tags: ["标签1", "标签2"]
featured: true
---

文章正文，支持标准 Markdown。
```

### Frontmatter 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题 |
| `description` | string | 是 | 文章摘要 |
| `publishDate` | date | 是 | 发布日期（ISO 格式） |
| `updatedDate` | date | 否 | 更新日期 |
| `tags` | string[] | 否 | 标签，默认 `[]` |
| `category` | string | 否 | 文章分类 |
| `draft` | boolean | 否 | 是否为草稿，默认 `false` |
| `featured` | boolean | 否 | 是否精选，默认 `false` |
| `cover` | string | 否 | 封面图片路径（本地文件） |
| `author` | string | 否 | 作者，默认使用站点配置 |
| `canonicalUrl` | string | 否 | 原始出处 URL |
| `slug` | string | 否 | 自定义永久链接（默认使用文件名） |

### 图片存放

图片文件可放在 `src/content/blog/` 或 `public/` 目录中。推荐放在文章同目录下：

```
src/content/blog/my-post/
  index.md
  cover.png
  screenshot.png
```

### 草稿和未来文章

- `draft: true` 的文章在开发环境可见，生产构建不会发布
- `publishDate` 晚于构建时间的文章不会发布
- RSS、Sitemap、搜索和文章列表均使用同一套过滤逻辑

## 搜索

生产构建后使用 Pagefind 建立全文索引。搜索功能只在 `search` 页面加载：

```
pnpm build
```

构建后 `dist/pagefind/` 目录即包含搜索索引。

## RSS

RSS 地址：`https://mujizi.com/rss.xml`

自动包含所有已发布文章，按时间倒序排列。

## GitHub Pages 部署

### 用户主页仓库（username.github.io）

- 无需额外配置
- `site: https://username.github.io`

### 项目仓库

- GitHub 仓库启用 Pages
- `site: https://username.github.io`
- `base: /repository-name`

### 使用自定义域名

1. 在域名提供商处添加 CNAME 记录指向 `username.github.io`
2. 在 GitHub 仓库 Settings → Pages 中设置自定义域名
3. `public/CNAME` 文件包含域名

本项目使用 `public/CNAME` 声明自定义域名，已配置 DNS。

## 项目目录

```
walog/
├── .github/workflows/deploy.yml  # CI/CD 配置
├── public/
│   ├── CNAME                      # 自定义域名
│   ├── favicon.svg                # 站点图标
│   └── robots.txt                 # 爬虫配置
├── src/
│   ├── components/                # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── ArticleCard.astro
│   │   ├── Pagination.astro
│   │   └── TagList.astro
│   ├── content/
│   │   └── blog/                  # Markdown 文章
│   ├── layouts/
│   │   └── BaseLayout.astro       # 基础布局
│   ├── pages/
│   │   ├── index.astro            # 首页
│   │   ├── about.astro            # 关于
│   │   ├── archive.astro          # 归档
│   │   ├── search.astro           # 搜索
│   │   ├── 404.astro              # 404 页面
│   │   ├── blog/                  # 文章列表和详情
│   │   ├── tags/                  # 标签页
│   │   ├── rss.xml.ts             # RSS 生成
│   │   └── robots.txt.ts          # robots.txt 生成
│   ├── styles/
│   │   └── global.css             # 全局样式
│   ├── utils/
│   │   └── index.ts               # 工具函数
│   ├── config.ts                  # 站点配置
│   └── content.config.ts          # 内容模型
```

## 可选功能

### Giscus 评论

编辑 `src/config.ts`，填写 Giscus 配置：

```ts
giscus: {
  repo: "owner/repo",
  repoId: "R_xxx",
  category: "Announcements",
  categoryId: "DIC_xxx",
}
```

未配置时不会渲染评论区域。repoId、categoryId 可通过 [Giscus 官网](https://giscus.app) 查询。

## 常见问题

**Q: 为什么 pnpm 安装失败？**

A: 确保使用 Node.js 22.12.0+ 并安装了 pnpm：

```bash
npm install -g pnpm
```

**Q: 如何添加新标签？**

A: 在文章的 Frontmatter 中设置 `tags` 字段，标签会自动聚合。

**Q: 搜索在开发环境不可用？**

A: Pagefind 只在生产构建后建立索引，开发环境使用 `pnpm dev` 时搜索会显示友好提示。

## 许可

MIT
