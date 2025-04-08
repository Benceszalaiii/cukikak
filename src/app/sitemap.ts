import type { MetadataRoute } from "next";
import "server-only";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://11c.jedlik.eu/";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: baseUrl + "timeline",
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: baseUrl + "movie",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
