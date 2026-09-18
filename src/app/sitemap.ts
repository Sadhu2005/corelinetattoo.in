import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/services",
    "/tattoo",
    "/tattoo/book",
    "/tattoo/designs",
    "/art",
    "/art/order",
    "/zumba",
    "/zumba/book",
    "/zumba/inquire",
    "/gallery",
    "/reviews",
    "/contact",
    "/locations/hassan",
    "/locations/bengaluru",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
