# Walog — jason.wa 的博客

基于 Astro 6 + AstroPaper v6 主题的个人博客。

## 快速命令

```bash
pnpm dev              # 开发服务器
pnpm build            # 构建 + TypeScript 检查 + Pagefind 搜索索引
pnpm preview          # 预览构建结果
pnpm sync             # 同步内容类型定义
pnpm add-post         # 新建文章（手动：复制 _template.md）
```

## 目录结构

```
astro-paper.config.ts   ← 博客配置（标题、社交链接、分页等）
src/
  content/
    posts/              ← 博客文章（.md / .mdx）
      _template.md      ← 文章模板
    pages/              ← 独立页面（about.md）
  components/           ← UI 组件
  layouts/              ← 页面布局
  pages/                ← 路由页面
  styles/               ← 样式（Tailwind CSS v4）
  i18n/                 ← 国际化（中文）
  utils/                ← 工具函数
public/                 ← 静态资源
```

## 写作规范

1. 文章放在 `src/content/posts/`，使用 `.md` 或 `.mdx`
2. 文件名使用英文 kebab-case（如 `my-awesome-post.md`）
3. Frontmatter 必须包含：`title`, `description`, `pubDatetime`, `tags`
4. 可选字段：`modDatetime`, `draft`, `featured`, `ogImage`, `canonicalURL`
5. `tags` 使用中文名称（如 `["博客", "Astro"]`）
6. 新建文章先复制 `_template.md`

## 发布流程

```bash
# 1. 写文章
cp src/content/posts/_template.md src/content/posts/my-post.md
# 编辑 my-post.md → 填写内容

# 2. 本地预览
pnpm dev

# 3. 构建验证
pnpm build

# 4. 提交推送
git add .
git commit -m "feat: add new post"
git push
# → GitHub Actions 自动构建部署
```

## FAQ

- 搜索索引由 `pagefind` 在构建时自动生成
- RSS 和 Sitemap 自动更新
- 自定义域名配置在 `public/CNAME`
