"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Contact
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("name")}
              </label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("email")}
              </label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("company")}
              </label>
              <Input id="company" name="company" />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                {t("message")}
              </label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === "sending"}
            >
              <Send className="mr-2 h-4 w-4" />
              {status === "sending" ? "..." : t("send")}
            </Button>
            {status === "sent" && (
              <p className="text-center text-sm text-green-600">
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-600">{t("error")}</p>
            )}
          </form>

          {/* Info */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">United Kingdom</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                OWL Intelligence Ltd.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">Turkiye</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Field research and operations office.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                <h3 className="font-semibold">Email</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                info@owlintelligence.co.uk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
