import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

const translations = {
  eyebrow: "Contact",
  signal: "Institutional Contact Channel",
  titleLead: "Let's",
  titleMain: "Talk",
  description: "For product demos, partnerships, or general enquiries, send us a note and we will get back to you.",
  directLabel: "Direct Email",
  directBody: "You can also contact us directly by email.",
  responseLabel: "Response Window",
  responseValue: "Within 1 business day",
  responseBody: "for most enquiries.",
  officeUkLabel: "Registered Office",
  officeUkTitle: "United Kingdom",
  officeTrLabel: "Operations And Field Network",
  officeTrTitle: "Istanbul",
  collaborationLabel: "Typical Starting Points",
  collaborationOne: "Product demos for institutions exploring FWBM, FuzzyOwl, or EconImpact.",
  collaborationTwo: "Partnership, research, and strategic collaboration conversations.",
  collaborationThree: "Investor, pilot, and custom implementation enquiries.",
  formBadge: "Secure Contact Form",
  formTitle: "Tell us briefly.",
  formDescription: "A short note is enough. We will route it to the right person.",
  name: "Full Name",
  email: "Work Email",
  company: "Institution / Company",
  message: "Message",
  namePlaceholder: "Your name",
  emailPlaceholder: "name@institution.com",
  companyPlaceholder: "Company or institution",
  messagePlaceholder: "How can we help?",
  send: "Send Message",
  sending: "Sending...",
  formFootnote: "Messages are sent to info@owlintelligence.co.uk and the relevant team members.",
  success: "Thank you. Your message has been delivered and our team will respond shortly.",
  error: "We could not send your message right now. Please try again or email info@owlintelligence.co.uk.",
} as const;

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => translations[key as keyof typeof translations] ?? key,
}));

describe("ContactPage", () => {
  beforeEach(() => {
    // This module reads env at import time in the client component.
    // Ensure it's unset by default for the "not configured" test.
    delete process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL;
  });

  it("renders the blueprint contact details and direct email link", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Let's");
    expect(
      screen.getByRole("link", { name: /info@owlintelligence\.co\.uk/i })
    ).toHaveAttribute("href", "mailto:info@owlintelligence.co.uk");
    expect(
      screen.getByText(/71-75 Shelton Street Covent Garden London WC2H 9JQ/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Kadir Has Teknopark/i)).toBeInTheDocument();
  });

  it("shows a configuration hint when Google Form is not set", async () => {
    render(<ContactPage />);

    expect(
      screen.getByText(/NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL/i)
    ).toBeInTheDocument();
  });
});
