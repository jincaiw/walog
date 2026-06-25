import { getCollection } from "astro:content";
import config from "@/config";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { slugifyStr } from "@/utils/slugify";

export async function GET(context: { site: URL }) {
	const allPosts = await getCollection("posts");
	const posts = getSortedPosts(allPosts);
	const siteUrl = context.site;

	const items = posts
		.map(
			(post) => `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${new URL(`/posts/${slugifyStr(post.data.title)}`, siteUrl).href}</link>
      <guid isPermaLink="true">${new URL(`/posts/${slugifyStr(post.data.title)}`, siteUrl).href}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.pubDatetime.toUTCString()}</pubDate>
    </item>`
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.site.title)}</title>
    <description>${escapeXml(config.site.description)}</description>
    <link>${siteUrl.href}</link>
    <language>${config.site.lang}</language>
    <atom:link href="${new URL("/rss.xml", siteUrl).href}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
