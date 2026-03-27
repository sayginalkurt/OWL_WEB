import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { toAbsoluteUrl } from "@/lib/seo/site";

const staticPages = [
  "",
  "/products",
  "/products/econimpact",
  "/products/fuzzyowl",
  "/products/fuzzyowl/playground",
  "/solutions",
  "/technology",
  "/insights",
  "/about",
  "/about/founders",
  "/about/investors",
  "/contact",
  "/agent",
  "/tools/product-finder",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const languages: Record<string, string> = {
        en: toAbsoluteUrl(`/en${page}`),
        tr: toAbsoluteUrl(`/tr${page}`),
      };

      entries.push({
        url: toAbsoluteUrl(`/${locale}${page}`),
        alternates: {
          languages,
        },
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
