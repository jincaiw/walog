import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPostSlug } from "@/utils/getPostPaths";
import config from "@/config";

export async function GET(context: { site: string }) {
	const posts = await getCollection("posts");
	return rss({
		title: config.site.title,
		description: config.site.description,
		site: context.site,
		items: posts.map(({ data, id, filePath }) => ({
			title: data.title,
			pubDate: data.pubDatetime,
			description: data.description,
			link: `/posts/${getPostSlug(id, filePath)}/`,
		})),
	});
}
