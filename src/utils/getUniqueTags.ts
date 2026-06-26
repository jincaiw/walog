import type { CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";
import { postFilter } from "./postFilter";

export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
	const filteredPosts = posts.filter(postFilter);
	const tags: string[] = [
		...new Set(filteredPosts.flatMap((post) => post.data.tags)),
	];
	return tags
		.map((tag) => ({
			tag,
			slug: slugifyAll([tag])[0],
		}))
		.filter(
			(obj, index, self) =>
				self.findIndex((t) => t.slug === obj.slug) === index,
		);
}
