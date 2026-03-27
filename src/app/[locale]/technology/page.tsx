import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";

import openAiLogo from "../../../../owlcontent/techlogo/openai.png";
import geminiLogo from "../../../../owlcontent/techlogo/gemini.png";
import anthropicLogo from "../../../../owlcontent/techlogo/antropic.png";
import supabaseLogo from "../../../../owlcontent/techlogo/supbase.webp";
import railwayLogo from "../../../../owlcontent/techlogo/railway.png";
import sanityLogo from "../../../../owlcontent/techlogo/sanity.png";
import nextJsLogo from "../../../../owlcontent/techlogo/nextjs.svg";
import eurostatLogo from "../../../../owlcontent/databaselogo/eurostat.png";
import imfLogo from "../../../../owlcontent/databaselogo/imf.svg";
import oecdLogo from "../../../../owlcontent/databaselogo/oecd.png";
import tcmbLogo from "../../../../owlcontent/databaselogo/tcmb.png";
import tuikLogo from "../../../../owlcontent/databaselogo/tuik.png";
import worldBankLogo from "../../../../owlcontent/databaselogo/worldbank.png";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

function LogoBand({
  headingId,
  label,
  items,
}: {
  headingId: string;
  label: string;
  items: Array<{
    id: string;
    name: string;
    image?: {
      src: StaticImageData;
      width: number;
      height: number;
    };
  }>;
}) {
  return (
    <section aria-labelledby={headingId}>
      <h3
        id={headingId}
        className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42"
      >
        {label}
      </h3>
      <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="inline-flex items-center"
          >
            {item.image ? (
              <>
                <Image
                  src={item.image.src}
                  alt={item.name}
                  width={item.image.width}
                  height={item.image.height}
                  className="h-[30px] w-auto object-contain opacity-90"
                  unoptimized
                />
                <span className="sr-only">{item.name}</span>
              </>
            ) : (
              <span className="text-sm font-medium tracking-tight text-foreground/70">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale, namespace: "technologyPage" });

  return buildPageMetadata({
    locale,
    pathname: "/technology",
    title: t("heroTitle"),
    description: t("heroLead"),
  });
}

export default function TechnologyPage() {
  const t = useTranslations("technologyPage");

  const pillars = [
    { id: "authenticFieldData" },
    { id: "proprietaryMethodology" },
    { id: "aiPoweredAnalysis" },
    { id: "fuzzyCognitiveMapping" },
    { id: "dataIntegrityGovernance" },
    { id: "multiLanguageIntelligence" },
  ] as const;

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <section className="max-w-4xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("heroTitle")}
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/68 sm:text-base">
            {t("heroLead")}
          </p>
          <p className="mt-10 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem] lg:text-[2.35rem]">
            {t("capabilities.lead")}
          </p>
        </section>

        <section
          className="mt-14 border-t border-border/60 pt-10"
        >
          <header className="max-w-4xl">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="h-px w-12 bg-[color:var(--color-owl-gold)]/35"
              />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-[2.35rem] lg:text-[2.65rem]">
              {t("capabilities.heading")}
            </h2>
          </header>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Card
                key={pillar.id}
                className="group relative overflow-hidden rounded-[1.6rem] border border-border/60 bg-background/70 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-owl-gold)]/35 hover:shadow-[0_26px_70px_-52px_rgba(15,23,42,0.35)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(211,175,55,0.12), transparent 58%), radial-gradient(circle at 14% 18%, rgba(211,175,55,0.08), transparent 46%)",
                  }}
                />
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl font-black tracking-tight">
                    {t(`capabilities.pillars.${pillar.id}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <p className="mx-auto max-w-[44ch] text-sm leading-relaxed text-foreground/68">
                    {t(`capabilities.pillars.${pillar.id}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-14 border-t border-border/60 pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-14">
              <section className="grid gap-6 border-t border-border/60 pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-12 bg-[color:var(--color-owl-gold)]/35" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                    {t("sections.aiPartnersHeading")}
                  </h2>
                  <p className="mt-6 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                    {t("sections.aiPartnersBody")}
                  </p>
                </div>
                <div className="lg:pt-1">
                  <LogoBand
                    headingId="ai-partners-band"
                    label={t("sections.aiPartnersBandLabel")}
                    items={[
                      {
                        id: "openai",
                        name: t("logoItems.openai"),
                        image: { src: openAiLogo, width: 640, height: 640 },
                      },
                      {
                        id: "gemini",
                        name: t("logoItems.gemini"),
                        image: { src: geminiLogo, width: 640, height: 640 },
                      },
                      {
                        id: "anthropic",
                        name: t("logoItems.anthropic"),
                        image: { src: anthropicLogo, width: 320, height: 320 },
                      },
                    ]}
                  />
                </div>
              </section>

              <section className="grid gap-6 border-t border-border/60 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-12 bg-[color:var(--color-owl-gold)]/35" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                    {t("sections.engineeringHeading")}
                  </h2>
                  <p className="mt-6 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                    {t("sections.engineeringBody")}
                  </p>
                </div>
                <div className="lg:pt-1">
                  <LogoBand
                    headingId="engineering-band"
                    label={t("sections.engineeringBandLabel")}
                    items={[
                      {
                        id: "supabase",
                        name: t("logoItems.supabase"),
                        image: { src: supabaseLogo, width: 300, height: 300 },
                      },
                      {
                        id: "nextjs",
                        name: t("logoItems.nextjs"),
                        image: { src: nextJsLogo, width: 800, height: 800 },
                      },
                      {
                        id: "railway",
                        name: t("logoItems.railway"),
                        image: { src: railwayLogo, width: 1024, height: 1024 },
                      },
                      {
                        id: "sanity",
                        name: t("logoItems.sanity"),
                        image: { src: sanityLogo, width: 364, height: 364 },
                      },
                    ]}
                  />
                </div>
              </section>

              <section className="grid gap-6 border-t border-border/60 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-12 bg-[color:var(--color-owl-gold)]/35" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                    {t("sections.sourcesHeading")}
                  </h2>
                  <p className="mt-6 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                    {t("sections.sourcesBody")}
                  </p>
                </div>
                <div className="lg:pt-1">
                  <LogoBand
                    headingId="sources-band"
                    label={t("sections.sourcesBandLabel")}
                    items={[
                      {
                        id: "imf",
                        name: t("logoItems.imf"),
                        image: { src: imfLogo, width: 588, height: 588 },
                      },
                      {
                        id: "tcmb",
                        name: t("logoItems.tcmb"),
                        image: { src: tcmbLogo, width: 830, height: 200 },
                      },
                      {
                        id: "tuik",
                        name: t("logoItems.tuik"),
                        image: { src: tuikLogo, width: 298, height: 200 },
                      },
                      {
                        id: "worldbank",
                        name: t("logoItems.worldBank"),
                        image: { src: worldBankLogo, width: 952, height: 193 },
                      },
                      {
                        id: "eurostat",
                        name: t("logoItems.eurostat"),
                        image: { src: eurostatLogo, width: 1397, height: 200 },
                      },
                      {
                        id: "oecd",
                        name: t("logoItems.oecd"),
                        image: { src: oecdLogo, width: 800, height: 200 },
                      },
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
