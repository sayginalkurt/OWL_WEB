"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

import econImpactLogo from "../../../../../owlcontent/images/productlogos/EconImpact.png";

export default function EconImpactPage() {
  const t = useTranslations("productsPage");

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={econImpactLogo}
              alt={t("econimpactName")}
              width={104}
              height={104}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#9e7d20]">
              {t("econimpactSoon")}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("econimpactName")}
          </h1>

          <div className="mt-8 max-w-3xl space-y-5 text-sm leading-[1.85] text-foreground/68 sm:text-base">
            <p>{t("econimpactP1")}</p>
            <p>{t("econimpactP2")}</p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "default" }), "h-11 rounded-full px-6")}
            >
              {t("econimpactCtaPrimary")}
            </Link>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full px-6")}
            >
              {t("title")}
            </Link>
          </div>
        </header>
      </div>
    </main>
  );
}

