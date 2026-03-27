"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const publicEmail = "info@owlintelligence.co.uk";

const offices = {
  uk: "OWL INTELLIGENCE LTD / LONDON 71-75 Shelton Street Covent Garden London WC2H 9JQ - UNITED KINGDOM",
  tr: "OWL INTELLIGENCE A.Ş. / İSTANBUL Kadir Has Teknopark Selimpaşa Mah. 1010. Sk. No: 10/1 İç Kapı No: 79 Silivri - TÜRKİYE",
};

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

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

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42"
                >
                  {t("name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder={t("namePlaceholder")}
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-foreground placeholder:text-foreground/32 focus-visible:border-[#9e7d20] focus-visible:ring-0 dark:focus-visible:border-[#d3af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42"
                >
                  {t("email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-foreground placeholder:text-foreground/32 focus-visible:border-[#9e7d20] focus-visible:ring-0 dark:focus-visible:border-[#d3af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42"
                >
                  {t("company")}
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder={t("companyPlaceholder")}
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-foreground placeholder:text-foreground/32 focus-visible:border-[#9e7d20] focus-visible:ring-0 dark:focus-visible:border-[#d3af37]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42"
                >
                  {t("message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder={t("messagePlaceholder")}
                  className="min-h-36 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 py-2 text-foreground placeholder:text-foreground/32 focus-visible:border-[#9e7d20] focus-visible:ring-0 dark:focus-visible:border-[#d3af37]"
                />
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="h-11 rounded-full bg-[#d3af37] px-6 text-[#0d1422] hover:bg-[#ddbb4f]"
                >
                  {status === "sending" ? t("sending") : t("send")}
                </Button>

                <p className="mt-4 max-w-sm text-xs leading-relaxed text-foreground/44">
                  {t("formFootnote")}
                </p>

                <div aria-live="polite" className="min-h-5 pt-4">
                  {status === "sent" && (
                    <p className="text-sm text-emerald-300">{t("success")}</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-rose-300">{t("error")}</p>
                  )}
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
