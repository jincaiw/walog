import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import config from "./astro-paper.config";

export default defineConfig({
	site: config.site.url,
	trailingSlash: "never",
	build: { format: "file" },
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				config.features?.showArchives !== false || !page.endsWith("/archives/"),
		}),
	],
	markdown: {
		processor: unified({
			remarkPlugins: [
				remarkToc,
				[remarkCollapse, { test: "Table of contents" }],
			],
		}),
		shikiConfig: {
			themes: { light: "min-light", dark: "night-owl" },
			defaultColor: false,
			wrap: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
