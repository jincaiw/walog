import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import config from "@/config";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { slugifyStr } from "@/utils/slugify";

export async function GET(context: { site: URL }) {
	const allPosts = await getCollection("posts");
	const posts = getSortedPosts(allPosts);

	return rss({
		title: config.site.title,
		description: config.site.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDatetime,
			link: new URL(`/posts/${slugifyStr(post.data.title)}`, context.site).href,
		})),
		customData: `<language>${config.site.lang}</language>`,
	});
}
