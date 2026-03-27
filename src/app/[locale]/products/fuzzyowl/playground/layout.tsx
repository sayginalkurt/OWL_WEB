import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

const META_BY_LOCALE: Record<"en" | "tr", { title: string; description: string }> = {
  en: {
    title: "FuzzyOwl Playground",
    description:
      "Try the FuzzyOwl playground to understand causal mapping and scenario simulation with a lightweight interactive demo.",
  },
  tr: {
    title: "FuzzyOwl Playground",
    description:
      "FuzzyOwl playground ile nedensel haritalama ve senaryo simulasyonunu interaktif bir demo ile deneyimleyin.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const localized = META_BY_LOCALE[locale];

  return buildPageMetadata({
    locale,
    pathname: "/products/fuzzyowl/playground",
    title: localized.title,
    description: localized.description,
  });
}

export default function FuzzyOwlPlaygroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
