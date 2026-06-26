import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { CollectionEntry } from "astro:content";
import config from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

const currentTimezone = config.site.timezone ?? "UTC";

export function getPostsByGroupCondition(
	posts: CollectionEntry<"posts">[],
): Map<string, CollectionEntry<"posts">[]> {
	const groups = new Map<string, CollectionEntry<"posts">[]>();

	posts.forEach((post) => {
		const year = dayjs(post.data.pubDatetime)
			.tz(currentTimezone)
			.format("YYYY");
		const existing = groups.get(year) || [];
		existing.push(post);
		groups.set(year, existing);
	});

	// Sort by year descending
	return new Map(
		[...groups.entries()].sort(
			([yearA], [yearB]) => Number(yearB) - Number(yearA),
		),
	);
}
