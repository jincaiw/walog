import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import { postFilter } from "./postFilter";

interface Tag {
  tag: string;
  tagSlug: string;
  count: number;
}

export function getUniqueTags(posts: CollectionEntry<"posts">[]): Tag[] {
  const tagMap = new Map<string, number>();
  for (const post of posts.filter(postFilter)) {
    const tags = post.data.tags;
    const uniqueTags = [...new Set(tags.map((t: string) => slugifyStr(t)))];
    for (const tag of uniqueTags) {
      const count = (tagMap.get(tag as string) ?? 0) + 1;
      tagMap.set(tag as string, count);
    }
  }
  return [...tagMap.entries()]
    .map(([tag, count]) => ({ tag, tagSlug: tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
