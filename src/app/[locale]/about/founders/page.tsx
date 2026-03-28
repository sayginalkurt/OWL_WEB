import Image from "next/image";
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
  const t = await getTranslations({ locale, namespace: "foundersPage" });

  return buildPageMetadata({
    locale,
    pathname: "/about/founders",
    title: t("title"),
    description: t("description"),
  });
}

export default function FoundersPage() {
  const t = useTranslations("foundersPage");
  const nav = useTranslations("nav");

  const founders = [
    {
      key: "beyza" as const,
      image: "/images/beyzapolat.png",
      imageAlt: "Beyza Polat",
    },
    {
      key: "saygin" as const,
      image: "/images/sayginalkurt.png",
      imageAlt: "Saygın Vedat Alkurt",
    },
  ];

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <section className="max-w-4xl">
          <h1 className="mt-2 max-w-[10ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/68 sm:text-base">
            {t("description")}
          </p>
        </section>

        <div className="mt-14 grid gap-8 border-t border-border/60 pt-10 lg:grid-cols-2">
          {founders.map((founder) => (
            <section
              key={founder.key}
              className="flex h-full flex-col items-center border border-border/60 bg-background/70"
            >
              <div className="flex flex-1 flex-col items-center p-6 text-center sm:p-7">
                <div className="mb-6 flex justify-center">
                  <div className="h-[180px] w-[180px] overflow-hidden rounded-full border border-border/60 bg-muted">
                    <Image
                      src={founder.image}
                      alt={founder.imageAlt}
                      width={288}
                      height={288}
                      sizes="180px"
                      className="h-full w-full object-cover object-top"
                      unoptimized
                    />
                  </div>
                </div>

                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42">
                  {t(`${founder.key}.role`)}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-[2.1rem]">
                  {t(`${founder.key}.name`)}
                </h2>
                <p className="mt-3 text-base font-medium text-foreground/70">
                  {t(`${founder.key}.credential`)}
                </p>

                <div className="mt-8 text-center text-sm leading-relaxed text-foreground/68 sm:text-base">
                  <p>{t(`${founder.key}.bioOne`)}</p>
                </div>

                <details className="mt-6 w-full border-t border-border/60 pt-5 text-center">
                  <summary className="cursor-pointer list-none text-sm font-medium text-foreground/78 marker:hidden">
                    {t("readMore")}
                  </summary>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/68 sm:text-base">
                    <p>{t(`${founder.key}.bioTwo`)}</p>
                    <p>{t(`${founder.key}.bioThree`)}</p>
                  </div>
                </details>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-border/60 pt-10">
          <Link href="/about" className={cn(buttonVariants({ variant: "outline" }))}>
            {nav("about")}
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            {nav("contact")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
