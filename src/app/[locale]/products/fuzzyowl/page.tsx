import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

import fuzzyOwlLogo from "../../../../../owlcontent/images/productlogos/FuzzyOWL.png";

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
    pathname: "/products/fuzzyowl",
    title: t("fuzzyowlName"),
    description: t("fuzzyowlLead"),
  });
}

export default function FuzzyOwlPage() {
  const t = useTranslations("productsPage");

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={fuzzyOwlLogo}
              alt={t("fuzzyowlName")}
              width={104}
              height={104}
              className="h-12 w-12 object-contain"
              priority
            />
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[color:var(--color-owl-gold)]">
              {t("fuzzyowlEyebrow")}
            </p>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("fuzzyowlName")}
          </h1>

          <p className="mt-6 text-xl font-semibold tracking-tight text-foreground/85 sm:text-2xl">
            {t("fuzzyowlTitle")}
          </p>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/68 sm:text-base">
            {t("fuzzyowlLead")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <span
              aria-disabled="true"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-11 cursor-not-allowed rounded-full bg-[#0d1422] px-6 text-white opacity-70"
              )}
              title={t("fuzzyowlSoon")}
            >
              {t("fuzzyowlCtaSecondary")} — {t("fuzzyowlSoon")}
            </span>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full px-6")}
            >
              {t("title")}
            </Link>
          </div>
        </header>

        <section className="mt-14 border-t border-border/60 pt-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="max-w-xl">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-[2.1rem]">
                {t("fuzzyowlHowHeading")}
              </h2>
            </div>

            <ol className="space-y-4">
              {[
                { title: t("fuzzyowlHow1Title"), body: t("fuzzyowlHow1Body") },
                { title: t("fuzzyowlHow2Title"), body: t("fuzzyowlHow2Body") },
                { title: t("fuzzyowlHow3Title"), body: t("fuzzyowlHow3Body") },
                { title: t("fuzzyowlHow4Title"), body: t("fuzzyowlHow4Body") },
              ].map((item, idx) => (
                <li
                  key={item.title}
                  className="rounded-[1.6rem] border border-border/60 bg-background/60 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-[0.8rem] font-bold tracking-[0.26em] text-[color:var(--color-owl-gold)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/68 sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-14 border-t border-border/60 pt-12">
          <header className="max-w-3xl">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-[2.1rem]">
              {t("fuzzyowlFeaturesHeading")}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-[1.85] text-foreground/70 sm:text-base">
              <p>{t("fuzzyowlP1")}</p>
              <p>{t("fuzzyowlP2")}</p>
            </div>
          </header>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              { title: t("fuzzyowlFeature1Title"), body: t("fuzzyowlFeature1Body") },
              { title: t("fuzzyowlFeature2Title"), body: t("fuzzyowlFeature2Body") },
              { title: t("fuzzyowlFeature3Title"), body: t("fuzzyowlFeature3Body") },
              { title: t("fuzzyowlFeature4Title"), body: t("fuzzyowlFeature4Body") },
              { title: t("fuzzyowlFeature5Title"), body: t("fuzzyowlFeature5Body") },
              { title: t("fuzzyowlFeature6Title"), body: t("fuzzyowlFeature6Body") },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="rounded-[1.8rem] border border-border/60 bg-background/60 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.12)]"
              >
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[color:var(--color-owl-gold)]">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="rounded-[2rem] border border-border/60 bg-background/70 p-7 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)] sm:p-9">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-[2.1rem]">
              {t("fuzzyowlCtaHeading")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/68 sm:text-base">
              {t("fuzzyowlCtaBody")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span
                aria-disabled="true"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-11 cursor-not-allowed rounded-full bg-[#0d1422] px-6 text-white opacity-70"
                )}
                title={t("fuzzyowlSoon")}
              >
                {t("fuzzyowlCtaSecondary")} — {t("fuzzyowlSoon")}
              </span>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full px-6")}
              >
                {t("econimpactCtaPrimary")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
