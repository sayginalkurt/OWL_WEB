import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AgentPageClient from "./agent-page-client";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale, namespace: "agentPage" });

  return buildPageMetadata({
    locale,
    pathname: "/agent",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default function AgentPage() {
  return <AgentPageClient />;
}
