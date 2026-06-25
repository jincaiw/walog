import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export function getPostPath(post: CollectionEntry<"posts">): string {
	return `/posts/${slugifyStr(post.data.title)}`;
}
