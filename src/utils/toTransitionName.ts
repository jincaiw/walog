import { slugifyStr } from "./slugify";

export function toTransitionName(title: string): string {
	return `post-${slugifyStr(title)}`;
}
