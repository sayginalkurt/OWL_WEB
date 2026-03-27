import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale, namespace: "productsPage" });

  return buildPageMetadata({
    locale,
    pathname: "/products/econimpact",
    title: t("econimpactName"),
    description: t("econimpactP1"),
  });
}

export default function EconImpactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
