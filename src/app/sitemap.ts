import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://owlintelligence.co.uk";

const staticPages = [
  "",
  "/products",
  "/products/fwbm",
  "/products/fwbm/demo",
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
  const locales = ["en", "tr"];
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
