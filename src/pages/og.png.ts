import type { APIRoute } from "astro";
import config from "@/config";

// Dynamic OG image disabled; this endpoint always returns 404.
export const GET: APIRoute = async () => {
	return config.features.dynamicOgImage
		? new Response(null, { status: 501 })
		: new Response(null, { status: 404 });
};
