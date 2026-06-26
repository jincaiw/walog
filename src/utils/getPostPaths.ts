import { slugifyStr } from "./slugify";
import { getRelativeLocaleUrl } from "astro:i18n";

export function getPostSlug(id: string, filePath?: string): string {
	// id is the file stem from content collection
	return slugifyStr(id);
}

export function getPostUrl(
	id: string,
	filePath: string | undefined,
	locale?: string,
): string {
	const slug = getPostSlug(id, filePath);
	return getRelativeLocaleUrl(locale ?? "", `posts/${slug}`);
}
