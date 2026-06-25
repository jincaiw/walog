import type { ResolvedAstroPaperConfig } from "./types/config";
import rawConfig from "../astro-paper.config";

function resolveConfig(): ResolvedAstroPaperConfig {
  const c = rawConfig;
  return {
    site: {
      url: c.site.url,
      title: c.site.title,
      description: c.site.description,
      author: c.site.author,
      lang: c.site.lang ?? "en",
      timezone: c.site.timezone ?? "UTC",
      dir: c.site.dir ?? "ltr",
      ogImage: c.site.ogImage ?? "default-og.jpg",
      profile: c.site.profile,
      googleVerification: c.site.googleVerification,
    },
    posts: {
      perPage: c.posts?.perPage ?? 10,
      perIndex: c.posts?.perIndex ?? 5,
      scheduledPostMargin: c.posts?.scheduledPostMargin ?? 15 * 60 * 1000,
    },
    features: {
      lightAndDarkMode: c.features?.lightAndDarkMode ?? true,
      dynamicOgImage: c.features?.dynamicOgImage ?? false,
      showArchives: c.features?.showArchives ?? true,
      showBackButton: c.features?.showBackButton ?? true,
      editPost: c.features?.editPost ?? { enabled: false },
      search: c.features?.search ?? "pagefind",
    },
    socials: c.socials ?? [],
    shareLinks: c.shareLinks ?? [],
  };
}

const config = resolveConfig();
export default config;
