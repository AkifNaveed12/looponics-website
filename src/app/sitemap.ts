import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/#services", "/#process", "/#faq", "/#contact"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `https://looponics.tech/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" || route === "/#services" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/#contact" ? 0.9 : route === "/#services" ? 0.8 : 0.7,
      });
    }
  }

  return sitemapEntries;
}
