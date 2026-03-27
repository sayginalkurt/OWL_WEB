import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return buildPageMetadata({
    locale,
    pathname: "/about",
    title: `${t("titleLead")} ${t("titleMain")}`.trim(),
    description: t("description"),
  });
}

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  const nav = useTranslations("nav");

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <section className="max-w-4xl">
          <h1 className="mt-5 max-w-[11ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            <span className="block">{t("titleLead")}</span>
            {t("titleMain") ? (
              <span className="mt-3 block text-foreground/55">{t("titleMain")}</span>
            ) : null}
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/68 sm:text-base">
            {t("description")}
          </p>

          <p className="mt-10 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem] lg:text-[2.35rem]">
            {t("standout")}
          </p>
        </section>

        <section className="mt-14 grid gap-10 border-t border-border/60 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="space-y-6 text-sm leading-relaxed text-foreground/68 sm:text-base">
            <p>{t("bodyOne")}</p>
            <p>{t("bodyTwo")}</p>
            <p>{t("bodyThree")}</p>
            <p>{t("bodyFour")}</p>
          </div>

          <div className="space-y-8">
            <div className="grid gap-6 border-t border-border/60 pt-6 sm:grid-cols-3 sm:gap-5 sm:pt-0 sm:border-t-0">
              <div className="border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0">
                <p className="text-2xl font-semibold tracking-tight text-foreground">15+</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/62">
                  {t("indicatorOne")}
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0">
                <p className="text-2xl font-semibold tracking-tight text-foreground">81</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/62">
                  {t("indicatorTwo")}
                </p>
              </div>
              <div className="border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0">
                <p className="text-2xl font-semibold tracking-tight text-foreground">Global</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/62">
                  {t("indicatorThree")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-border/60 pt-10">
          <Link
            href="/about/founders"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {nav("founders")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/about/investors"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {nav("investors")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
