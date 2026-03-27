import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale, namespace: "investorsPage" });

  return buildPageMetadata({
    locale,
    pathname: "/about/investors",
    title: t("title"),
    description: t("section1Body"),
  });
}

export default function InvestorsPage() {
  const t = useTranslations("investorsPage");

  const sections = [
    { title: t("section1Title"), body: t("section1Body") },
    { title: t("section2Title"), body: t("section2Body") },
    { title: t("section3Title"), body: t("section3Body") },
    { title: t("section4Title"), body: t("section4Body") },
    { title: t("section5Title"), body: t("section5Body") },
    { title: t("section6Title"), body: t("section6Body") },
    { title: t("section7Title"), body: t("section7Body") },
  ] as const;

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <section className="max-w-5xl">
          <h1 className="mt-2 max-w-[15ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            {t("title")}
          </h1>
        </section>

        <div className="mt-14 border-t border-border/60 pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-14">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  className="grid gap-6 border-t border-border/60 pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:gap-10"
                >
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#9e7d20]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-[#d3af37]/35 lg:h-10 lg:w-px lg:flex-none"
                    />
                  </div>

                  <div className="max-w-3xl">
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                      {section.title}
                    </h2>
                    <p className="mt-6 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                      {section.body}
                    </p>
                  </div>
                </section>
              ))}

              <section className="relative overflow-hidden rounded-[1.9rem] border border-[#d3af37]/18 bg-[#fbf7ea] p-7 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)] sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(211,175,55,0.10),transparent_40%),radial-gradient(circle_at_84%_24%,rgba(136,153,187,0.08),transparent_46%)]"
                />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d3af37]/85" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[radial-gradient(circle_at_50%_0%,rgba(211,175,55,0.18),transparent_62%)]"
                />
                <div className="relative max-w-3xl">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#9e7d20]">
                    08
                  </p>
                  <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
                    {t("section8Title")}
                  </h2>
                  <p className="mt-6 text-sm leading-[1.85] text-foreground/70 sm:text-base">
                    {t("section8Body")}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "h-11 rounded-full bg-[#d3af37] px-6 text-[#0d1422] shadow-[0_18px_60px_-28px_rgba(211,175,55,0.75)] hover:bg-[#ddbb4f]"
                      )}
                    >
                      {t("ctaPrimary")}
                    </Link>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 rounded-full border-[#0d1422]/20 bg-transparent px-6 text-[#0d1422] hover:bg-[#0d1422]/5 hover:text-[#0d1422] dark:hover:text-[#0d1422]"
                      )}
                    >
                      {t("ctaSecondary")}
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
