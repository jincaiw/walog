import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config";
import { getPublishedPosts, sortPostsByDate, getPostSlug } from "@/utils";

export async function GET(context: { site: URL }) {
	const allPosts = await getCollection("blog");
	const posts = sortPostsByDate(getPublishedPosts(allPosts));

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: new URL(`/blog/${getPostSlug(post)}`, context.site).href,
		})),
		customData: `<language>${siteConfig.lang}</language>`,
	});
}
