"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { getLegalContent } from "./legal-content";
import { LegalDocumentDialog } from "./legal-document-dialog";

export const COOKIE_CONSENT_KEY = "owl-cookie-consent";

function hasAcceptedCookieConsent() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }

  const cookieAccepted = document.cookie
    .split(";")
    .some((entry) => entry.trim() === `${COOKIE_CONSENT_KEY}=accepted`);

  return cookieAccepted || window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}

function persistCookieConsent() {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_CONSENT_KEY}=accepted; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
  }
}

export function CookieConsentBanner() {
  const locale = useLocale();
  const copy = getLegalContent(locale).cookie;
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasAcceptedCookieConsent());
    setReady(true);
  }, []);

  const handleAccept = () => {
    persistCookieConsent();
    setVisible(false);
  };

  if (!ready || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] px-4">
      <div
        className="pointer-events-auto mx-auto max-w-5xl rounded-[1.35rem] border border-border/70 bg-background/92 p-5 shadow-[0_24px_80px_-34px_rgba(3,8,20,0.7)] backdrop-blur-xl"
        data-testid="cookie-consent-banner"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-chart-3">
              {copy.badge}
            </p>
            <h2 className="mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <LegalDocumentDialog
                documentKey="privacy"
                triggerLabel={copy.privacyLabel}
                className="rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
              />
              <LegalDocumentDialog
                documentKey="terms"
                triggerLabel={copy.termsLabel}
                className="rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
              />
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <Button onClick={handleAccept} className="min-w-40">
              {copy.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
