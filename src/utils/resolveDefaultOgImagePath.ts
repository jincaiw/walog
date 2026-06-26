import config from "@/config";

export function resolveDefaultOgImagePath(config: {
	site: { ogImage: string };
}): string {
	const ogImage = config.site.ogImage.startsWith("/")
		? config.site.ogImage
		: `/${config.site.ogImage}`;
	return ogImage;
}
