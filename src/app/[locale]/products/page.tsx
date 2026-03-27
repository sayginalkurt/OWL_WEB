import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import fwbmLogo from "../../../../owlcontent/images/productlogos/FWBM.png";
import fuzzyOwlLogo from "../../../../owlcontent/images/productlogos/EconImpact.png";
import econImpactLogo from "../../../../owlcontent/images/productlogos/FuzzyOWL.png";

export default function ProductsPage() {
  const t = useTranslations("productsPage");
  const ct = useTranslations("common");

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <header className="max-w-4xl">
          <h1 className="mt-2 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/68 sm:text-base">
            {t("lead")}
          </p>
        </header>

        <section className="mt-14 overflow-hidden rounded-[2rem] border border-border/60 bg-background/70 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)]">
          <div className="relative px-6 py-10 sm:px-10 lg:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(211,175,55,0.10),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(136,153,187,0.10),transparent_46%)]"
            />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#9e7d20]">
                  {t("featuredBadge")}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                  {t("fwbmTitle")}
                </h2>
                <div className="mt-7 space-y-5 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                  <p>{t("fwbmP1")}</p>
                  <p>{t("fwbmP2")}</p>
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://fwbm.com.tr"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "h-11 rounded-full bg-[#d3af37] px-6 text-[#0d1422] shadow-[0_18px_60px_-28px_rgba(211,175,55,0.75)] hover:bg-[#ddbb4f]"
                    )}
                  >
                    {t("fwbmCtaPrimary")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-11 rounded-full"
                    )}
                  >
                    {t("fwbmCtaSecondary")}
                  </Link>
                </div>
              </div>

              <div className="flex items-start justify-start lg:justify-end">
                <div className="w-full max-w-sm rounded-[1.75rem] border border-border/60 bg-background/60 p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={fwbmLogo}
                      alt={t("fwbmName")}
                      width={80}
                      height={80}
                      className="h-11 w-11 object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-foreground">{t("fwbmName")}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 text-sm text-foreground/70">
                    <div className="flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-foreground/60">{t("fwbmStatsCoverageLabel")}</span>
                      <span className="font-semibold text-foreground">{t("fwbmStatsCoverageValue")}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-foreground/60">{t("fwbmStatsCadenceLabel")}</span>
                      <span className="font-semibold text-foreground">{t("fwbmStatsCadenceValue")}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-foreground/60">{t("fwbmStatsSampleLabel")}</span>
                      <span className="font-semibold text-foreground">{t("fwbmStatsSampleValue")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-border/60 pt-12">
          <div className="space-y-12">
            <div className="grid gap-8 rounded-[1.8rem] border border-border/60 bg-background/60 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.12)] sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
              <Image
                src={fuzzyOwlLogo}
                alt={t("fuzzyowlName")}
                width={92}
                height={92}
                className="h-11 w-11 object-contain"
              />
              <div className="max-w-3xl">
                <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-[2.1rem]">
                  {t("fuzzyowlName")}
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                  <p>{t("fuzzyowlP1")}</p>
                  <p>{t("fuzzyowlP2")}</p>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/products/fuzzyowl" className={cn(buttonVariants({ variant: "default" }))}>
                    {t("fuzzyowlCtaPrimary")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <span
                    aria-disabled="true"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "cursor-not-allowed opacity-70"
                    )}
                    title={t("fuzzyowlSoon")}
                  >
                    {t("fuzzyowlCtaSecondary")} — {t("fuzzyowlSoon")}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-8 rounded-[1.8rem] border border-border/60 bg-background/60 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.12)] sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
              <Image
                src={econImpactLogo}
                alt={t("econimpactName")}
                width={92}
                height={92}
                className="h-11 w-11 object-contain"
              />
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-[2.1rem]">
                    {t("econimpactName")}
                  </h3>
                  <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#9e7d20]">
                    {t("econimpactSoon")}
                  </span>
                </div>
                <div className="mt-4 space-y-4 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                  <p>{t("econimpactP1")}</p>
                  <p>{t("econimpactP2")}</p>
                </div>
                <div className="mt-7">
                  <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
                    {t("econimpactCtaPrimary")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
