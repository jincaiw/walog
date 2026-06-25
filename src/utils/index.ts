import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/config";

export type Post = CollectionEntry<"blog">;

export function getPublishedPosts(posts: Post[]): Post[] {
	const now = new Date();
	return posts.filter(
		(post) => !post.data.draft && new Date(post.data.publishDate) <= now,
	);
}

export function sortPostsByDate(posts: Post[]): Post[] {
	return [...posts].sort(
		(a, b) =>
			new Date(b.data.publishDate).getTime() -
			new Date(a.data.publishDate).getTime(),
	);
}

export function getFeaturedPosts(posts: Post[]): Post[] {
	return getPublishedPosts(posts)
		.filter((post) => post.data.featured)
		.sort(
			(a, b) =>
				new Date(b.data.publishDate).getTime() -
				new Date(a.data.publishDate).getTime(),
		);
}

export function getPostSlug(post: Post): string {
	return post.data.slug ?? post.id.replace(/\.md$/, "");
}

export function getPostUrl(post: Post): string {
	return `/blog/${getPostSlug(post)}`;
}

export function getAllTags(posts: Post[]): { tag: string; count: number }[] {
	const tagMap = new Map<string, number>();
	for (const post of getPublishedPosts(posts)) {
		const tags = post.data.tags.map((t: string) => t.trim()).filter(Boolean);
		const unique = [...new Set(tags)];
		for (const tag of unique) {
			const count = (tagMap.get(tag as string) ?? 0) + 1;
			tagMap.set(tag as string, count);
		}
	}
	return [...tagMap.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getReadingTime(text: string): number {
	const cjkChars = (
		text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []
	).length;
	const wordChars = text
		.replace(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, "")
		.split(/\s+/)
		.filter(Boolean).length;
	const totalMinutes = Math.ceil(cjkChars / 400 + wordChars / 200);
	return Math.max(1, totalMinutes);
}

export function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}

export function getPaginatedPosts(
	posts: Post[],
	page: number,
	perPage: number = siteConfig.postsPerPage,
): { posts: Post[]; totalPages: number; currentPage: number } {
	const published = sortPostsByDate(getPublishedPosts(posts));
	const totalPages = Math.ceil(published.length / perPage);
	const start = (page - 1) * perPage;
	return {
		posts: published.slice(start, start + perPage),
		totalPages,
		currentPage: page,
	};
}

export function groupPostsByYear(posts: Post[]): Record<number, Post[]> {
	const grouped: Record<number, Post[]> = {};
	for (const post of sortPostsByDate(getPublishedPosts(posts))) {
		const year = new Date(post.data.publishDate).getFullYear();
		if (!grouped[year]) grouped[year] = [];
		grouped[year].push(post);
	}
	return grouped;
}

export function getAdjacentPosts(
	posts: Post[],
	currentSlug: string,
): { prev: Post | null; next: Post | null } {
	const sorted = sortPostsByDate(getPublishedPosts(posts));
	const index = sorted.findIndex((p) => getPostSlug(p) === currentSlug);
	return {
		prev: index < sorted.length - 1 ? sorted[index + 1] : null,
		next: index > 0 ? sorted[index - 1] : null,
	};
}
