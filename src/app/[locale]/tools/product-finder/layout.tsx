import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

const META_BY_LOCALE: Record<"en" | "tr", { title: string; description: string }> = {
  en: {
    title: "Product Finder",
    description:
      "Answer a few guided questions and discover whether FWBM, FuzzyOwl, or both are the right fit for your intelligence needs.",
  },
  tr: {
    title: "Urun Bulucu",
    description:
      "Birka kac yonlendirilmis soruyu yanitlayin ve istihbarat ihtiyaclariniz icin FWBM, FuzzyOwl veya ikisinin uygunlugunu kesfedin.",
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
    pathname: "/tools/product-finder",
    title: localized.title,
    description: localized.description,
  });
}

export default function ProductFinderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
