"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AgentPage() {
  const locale = useLocale();
  const nav = useTranslations("nav");
  const t = useTranslations("agentPage");

  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: t("initialMessage") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("initialMessage") }]);
    setInput("");
    setLoading(false);
  }, [locale, t]);

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          locale,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("errorMessage"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
          <section className="max-w-4xl">
            <h1 className="mt-5 max-w-[11ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.1rem]">
              {t("title")}
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-foreground/68 sm:text-base">
              {t("subtitle")}
            </p>
          </section>

          <aside className="lg:sticky lg:top-24">
            <Card className="flex h-[78dvh] max-h-[52rem] min-h-[34rem] flex-col overflow-hidden border-border/60 bg-background/80 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)] backdrop-blur">
              <CardContent className="flex flex-1 flex-col overflow-hidden p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-border/50 pb-4">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-foreground/45">
                      {locale === "tr" ? "OWLAsistanı" : "OWLAssistant"}
                    </p>
                  </div>
                </div>

                <div
                  ref={messagesViewportRef}
                  className="mt-5 flex-1 space-y-4 overflow-y-auto pr-2"
                >
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          msg.role === "assistant" ? "bg-foreground text-background" : "bg-muted"
                        }`}
                      >
                        {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "assistant" ? "bg-muted text-foreground" : "bg-foreground text-background"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="rounded-2xl bg-muted px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin text-foreground/70" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSend} className="mt-5 flex gap-2 border-t border-border/50 pt-4">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("inputPlaceholder")}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label={t("title")}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
