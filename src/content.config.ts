import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		category: z.string().optional(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		cover: z.string().optional(),
		author: z.string().optional(),
		canonicalUrl: z.string().optional(),
		slug: z.string().optional(),
	}),
});

export const collections = { blog };
