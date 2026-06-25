import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://mujizi.com",
    title: "jason.wa的博客",
    description: "记录日常生活、想法、脑洞、思考等",
    author: "jason.wa",
    profile: "https://github.com/jincaiw",
    ogImage: "default-og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/jincaiw" },
    { name: "rss", url: "https://mujizi.com/rss.xml" },
  ],
  shareLinks: [],
});
