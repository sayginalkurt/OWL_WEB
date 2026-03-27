import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
  honeypot: z.string().trim().max(200).optional().or(z.literal("")),
});

const defaultRecipients = [
  "info@owlintelligence.co.uk",
  "beyzapolat@fwbm.com.tr",
  "sayginalkurt@fwbm.com.tr",
];

function getRecipients() {
  const recipients = (process.env.CONTACT_TO_EMAILS ?? defaultRecipients.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return recipients.length ? recipients : defaultRecipients;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Honeypot: treat as success but ignore (basic spam mitigation)
    if (parsed.data.honeypot && parsed.data.honeypot.trim()) {
      return NextResponse.json({ success: true });
    }

    const webAppUrl = process.env.CONTACT_SHEETS_WEBAPP_URL;
    const secret = process.env.CONTACT_SHEETS_SECRET;
    const recipients = getRecipients();

    if (!webAppUrl || !secret) {
      console.error("Contact Sheets configuration is incomplete.");
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable" },
        { status: 500 }
      );
    }

    const submission = {
      ...parsed.data,
      company: parsed.data.company?.trim() || "Not provided",
    };

    // Best-effort, in-memory rate limit (per instance) to reduce spam/abuse.
    // 30 requests / 10 minutes per IP.
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const limit = 30;
    // @ts-expect-error - attach to global to persist across requests
    globalThis.__owlContactRateLimit ??= new Map<string, number[]>();
    // @ts-expect-error - attached above
    const store: Map<string, number[]> = globalThis.__owlContactRateLimit;
    const arr = (store.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (arr.length >= limit) {
      store.set(ip, arr);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    arr.push(now);
    store.set(ip, arr);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    try {
      const payload = JSON.stringify({
        secret,
        name: submission.name,
        email: submission.email,
        company: submission.company,
        message: submission.message,
        meta: {
          userAgent: req.headers.get("user-agent") ?? "",
          ip,
        },
        recipients,
        subject: `New OWL contact enquiry from ${submission.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin-bottom: 16px;">New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
            <p><strong>Institution / Company:</strong> ${escapeHtml(submission.company)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(submission.message)}</p>
          </div>
        `,
      });

      async function postJson(url: string) {
        return fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          redirect: "manual",
          signal: controller.signal,
        });
      }

      // Apps Script frequently responds 302 to script.googleusercontent.com.
      // Many clients turn POST->GET on 302/303, so we follow manually and re-POST.
      let res = await postJson(webAppUrl);
      if ((res.status === 301 || res.status === 302 || res.status === 303) && res.headers.get("location")) {
        const redirected = res.headers.get("location")!;
        res = await postJson(redirected);
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Contact Sheets WebApp failed:", res.status, text);
        return NextResponse.json(
          { error: "Contact form is temporarily unavailable" },
          { status: 500 }
        );
      }

      const result = (await res.json().catch(() => null)) as
        | { success?: boolean; emailSent?: boolean; error?: string }
        | null;
      if (!result?.success || !result.emailSent) {
        console.error("Contact Sheets WebApp email failed:", result);
        return NextResponse.json(
          { error: "Contact form is temporarily unavailable" },
          { status: 500 }
        );
      }
    } finally {
      clearTimeout(timeout);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
