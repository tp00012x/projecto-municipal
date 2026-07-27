import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap:
      "https://portal-ciudadano-pueblo-libre.drunk182.chatgpt.site/sitemap.xml",
  };
}

