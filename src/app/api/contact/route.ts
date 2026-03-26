import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

const defaultRecipients = [
  "info@owlintelligence.co.uk",
  "beyzapolat@fwbm.com.tr",
  "sayginalkurt@fwbm.com.tr",
];

function getMailConfig() {
  const host = process.env.CONTACT_SMTP_HOST;
  const port = Number(process.env.CONTACT_SMTP_PORT ?? "465");
  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? user;
  const fromName = process.env.CONTACT_FROM_NAME ?? "OWL Intelligence";
  const recipients = (process.env.CONTACT_TO_EMAILS ?? defaultRecipients.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!host || !user || !pass || !fromEmail || Number.isNaN(port) || recipients.length === 0) {
    return null;
  }

  return {
    host,
    port,
    user,
    pass,
    fromEmail,
    fromName,
    recipients,
  };
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

    const config = getMailConfig();
    if (!config) {
      console.error("Contact mail configuration is incomplete.");
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable" },
        { status: 500 }
      );
    }

    const submission = {
      ...parsed.data,
      company: parsed.data.company?.trim() || "Not provided",
    };

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.recipients,
      replyTo: submission.email,
      subject: `New OWL contact enquiry from ${submission.name}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Institution / Company: ${submission.company}`,
        "",
        "Message:",
        submission.message,
      ].join("\n"),
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
