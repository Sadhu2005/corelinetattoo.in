import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/gallery",
    "/tattoo-gallery",
    "/order-portrait",
    "/book-tattoo",
    "/reviews",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
