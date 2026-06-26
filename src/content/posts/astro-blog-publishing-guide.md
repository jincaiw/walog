---
title: "Astro 博客文章发布教程和步骤"
description: "从新建文章到构建部署，五分钟搞定的极简发布流程。"
pubDatetime: "2026-06-26"
tags: ["博客", "Astro"]
featured: false
---

## 发布流程

整个流程三步走：**写 → 验 → 推**。

### 第一步：新建文章

从模板复制：

```bash
pnpm new-post 文章名称
# 或手动复制
cp src/content/posts/_template.md src/content/posts/你的文章.md
```

填写 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要，显示在列表页和搜索引擎结果中"
pubDatetime: "2026-06-26"
tags: ["标签1", "标签2"]
draft: false
featured: false
---
```

- `tags` 使用中文（如 `["博客", "Astro"]`）
- `draft: true` 时不会发布到生产环境
- `featured: true` 会出现在首页「精选」区域

### 第二步：本地预览

```bash
pnpm dev
```

浏览器打开 `http://localhost:4321` 实时查看效果。修改文件后自动热更新。

### 第三步：构建并部署

```bash
pnpm build        # 类型检查 → 构建 → 搜索索引
git add .
git commit -m "📝 post: 文章标题"
git push
```

推送后 GitHub Actions 自动执行：

```
push → install deps → astro check → astro build → pagefind → deploy to Pages
```

网站地址：<https://mujizi.com>

## 常见问题

**Q: 构建时报错怎么办？**

`pnpm dev` 先看有没有语法错误。`pnpm build` 会执行 `astro check`，TypeScript 问题会直接提示。

**Q: 想修改文章怎么办？**

直接编辑 `src/content/posts/` 下的 `.md` 文件，修改 frontmatter 中的 `modDatetime`：

```yaml
modDatetime: "2026-06-26"
```

然后重新 `git push` 即可。

**Q: 文章不想发布了？**

将 frontmatter 中的 `draft` 改为 `true`，或者直接删除文件。

## 目录结构备忘

```
src/content/posts/              ← 所有文章在这里
  _template.md                  ← 文章模板
  你的文章.md                   ← 你的文章
astro-paper.config.ts           ← 博客配置
public/CNAME                    ← 自定义域名
.github/workflows/deploy.yml    ← CI/CD 配置
```
