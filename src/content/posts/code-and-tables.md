---
title: "代码块、引用与表格整理"
description: "一篇测试各种 Markdown 元素展示效果的文章，包括多语言代码高亮、引用块、表格和列表。"
pubDatetime: "2026-06-24"
tags: ["Markdown", "前端"]
featured: false
---

## 代码块

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

### Python

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

## 引用

> 好的代码本身就是最好的文档。

> 在计算机科学中，只有两件难事：缓存失效和命名。

## 表格

| 语言 | 类型系统 | 主要用途 |
|------|---------|---------|
| TypeScript | 静态强类型 | Web 前端/后端 |
| Go | 静态强类型 | 后端/系统编程 |
| Rust | 静态强类型 | 系统编程 |
| Python | 动态强类型 | 脚本/数据科学 |

## 小结

本文测试了博客对多种 Markdown 元素的渲染效果。
