"use client";

import { useTranslations } from "next-intl";

const publicEmail = "info@owlintelligence.co.uk";
const googleFormEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL ?? "";

const offices = {
  uk: "OWL INTELLIGENCE LTD / LONDON 71-75 Shelton Street Covent Garden London WC2H 9JQ - UNITED KINGDOM",
  tr: "OWL INTELLIGENCE A.Ş. / İSTANBUL Kadir Has Teknopark Selimpaşa Mah. 1010. Sk. No: 10/1 İç Kapı No: 79 Silivri - TÜRKİYE",
};

export default function ContactPageClient() {
  const t = useTranslations("contact");

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(211,175,55,0.10),transparent_24%)] dark:bg-[radial-gradient(circle_at_64%_16%,rgba(211,175,55,0.12),transparent_26%)]"
      />

      <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="max-w-3xl">
            <h1 className="mt-5 max-w-[10ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
              <span className="block">{t("titleLead")}</span>
              <span className="mt-3 block text-foreground/55">{t("titleMain")}</span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/68 sm:text-base">
              {t("description")}
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42">
                  {t("directLabel")}
                </p>
                <a
                  href={`mailto:${publicEmail}`}
                  className="mt-3 inline-block text-2xl font-semibold tracking-tight text-foreground transition hover:text-[#9e7d20] dark:hover:text-[#d3af37]"
                >
                  {publicEmail}
                </a>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/62">
                  {t("directBody")}
                </p>
              </div>

              <div className="grid gap-8 border-t border-border/60 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42">
                    {t("officeUkTitle")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/68">
                    {offices.uk}
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-foreground/42">
                    {t("officeTrTitle")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/68">
                    {offices.tr}
                  </p>
                </div>
              </div>

              <p className="border-t border-border/60 pt-8 text-sm leading-relaxed text-foreground/62">
                <span className="font-semibold text-foreground/88">{t("responseValue")}</span>{" "}
                {t("responseBody")}
              </p>
            </div>
          </section>

          <section className="border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-[2.05rem]">
              {t("formTitle")}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/62">
              {t("formDescription")}
            </p>

            <div className="mt-8">
              {googleFormEmbedUrl ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)]">
                    <iframe
                      title="Contact form"
                      src={googleFormEmbedUrl}
                      className="h-[820px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/44">
                    If the embedded form doesn’t load, open it in a new tab:{" "}
                    <a
                      className="underline underline-offset-4"
                      href={googleFormEmbedUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {googleFormEmbedUrl}
                    </a>
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-background/60 p-6 text-sm text-foreground/70">
                  Google Form is not configured yet. Set{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                    NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL
                  </code>{" "}
                  in your Railway environment variables.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
