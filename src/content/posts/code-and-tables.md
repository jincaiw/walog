---
title: "代码块、引用与表格整理"
description: "一篇测试各种 Markdown 元素展示效果的文章，包括多语言代码高亮、引用块、表格和列表。"
pubDatetime: "2026-06-24"
tags: ["Markdown", "前端"]
featured: true
---

## 引言

一篇好的技术文章，往往需要混合使用多种 Markdown 元素。本文用于测试代码块、引用、表格等元素在博客中的渲染效果。

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

console.log(fibonacci(10)); // 55
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return response.json();
}
```

### Python

```python
from typing import List

def quick_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numbers))
# [1, 1, 2, 3, 6, 8, 10]
```

### Bash

```bash
#!/bin/bash
# 批量重命名文件

for file in *.log; do
  if [ -f "$file" ]; then
    new_name="backup_$(date +%Y%m%d)_$file"
    mv "$file" "$new_name"
    echo "Renamed: $file -> $new_name"
  fi
done
```

### 行内代码

在 TypeScript 中，可以使用 `Array.prototype.map()` 方法对数组进行变换，或者用 `async/await` 处理异步操作。记得用 `try/catch` 包裹 `await` 表达式以处理异常。

## 引用

> 编程不是关于你知道什么，而是关于你能弄清楚什么。
>
> — 未知来源

> 好的代码本身就是最好的文档。当你要加注释时，先想想是否能改进代码让它不言自明。
>
> — Steve McConnell

> 在计算机科学中，只有两件难事：缓存失效和命名。
>
> — Phil Karlton

## 表格

### 编程语言对比

| 语言 | 类型系统 | 内存管理 | 主要用途 |
|------|---------|---------|---------|
| TypeScript | 静态强类型 | GC 自动 | Web 前端/后端 |
| Go | 静态强类型 | GC 自动 | 后端/系统编程 |
| Rust | 静态强类型 | 所有权 | 系统编程 |
| Python | 动态强类型 | GC 自动 | 脚本/数据科学 |
| C | 静态弱类型 | 手动 | 系统/嵌入式 |

### HTTP 状态码速查

| 状态码 | 类别 | 含义 | 常见场景 |
|--------|------|------|---------|
| 200 | 成功 | OK | GET 请求成功 |
| 201 | 成功 | Created | POST 创建资源成功 |
| 301 | 重定向 | Moved Permanently | 域名变更 |
| 400 | 客户端错误 | Bad Request | 参数校验失败 |
| 401 | 客户端错误 | Unauthorized | 未登录 |
| 403 | 客户端错误 | Forbidden | 无权限 |
| 404 | 客户端错误 | Not Found | 资源不存在 |
| 500 | 服务端错误 | Internal Server Error | 服务器异常 |
| 502 | 服务端错误 | Bad Gateway | 上游服务不可达 |
| 503 | 服务端错误 | Service Unavailable | 服务过载 |

## 列表

### 有序列表

1. 需求分析
2. 系统设计
3. 编码实现
4. 测试验证
5. 部署上线
6. 运维监控

### 无序列表

- **性能优化**
  - 数据库索引优化
  - 缓存策略设计
  - CDN 加速
- **安全加固**
  - 输入校验
  - SQL 注入防护
  - XSS 过滤
- **监控告警**
  - 基础设施监控
  - 应用性能监控
  - 业务指标监控

## 分隔线

---

## 脚注

这是一段需要注释的文字[^1]。这里还有一段引用[^2]。

[^1]: 这是脚注的内容，用于补充说明。
[^2]: 第二个脚注，可以包含更多细节信息。

## 删除线

~~这个功能已经废弃了~~，请使用新的 API。

~~旧的实现方案~~ 已被下面的新方案取代。

## 小结

本文测试了博客对多种 Markdown 元素的渲染效果，包括代码高亮、引用块、表格、列表、脚注和删除线等。所有元素均在不同屏幕尺寸下进行了验证。
