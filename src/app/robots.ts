import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/11c/",
    },
    sitemap: "https://11c.jedlik.eu/sitemap.xml",
  };
}
