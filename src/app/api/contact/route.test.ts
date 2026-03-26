import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const sendMail = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail,
    })),
  },
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMail.mockReset();
    process.env.CONTACT_SMTP_HOST = "mail.owlintelligence.co.uk";
    process.env.CONTACT_SMTP_PORT = "465";
    process.env.CONTACT_SMTP_USER = "post@owlintelligence.co.uk";
    process.env.CONTACT_SMTP_PASS = "password";
    process.env.CONTACT_FROM_EMAIL = "post@owlintelligence.co.uk";
    process.env.CONTACT_FROM_NAME = "OWL Intelligence";
    process.env.CONTACT_TO_EMAILS =
      "info@owlintelligence.co.uk,beyzapolat@fwbm.com.tr,sayginalkurt@fwbm.com.tr";
  });

  it("sends a validated contact submission via SMTP", async () => {
    sendMail.mockResolvedValue({ messageId: "test" });

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          company: "OWL Partner",
          message: "We want to talk about a pilot.",
        }),
      }) as never
    );

    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: "jane@example.com",
        subject: "New OWL contact enquiry from Jane Doe",
      })
    );
  });

  it("rejects incomplete submissions", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "",
          email: "invalid",
          message: "",
        }),
      }) as never
    );

    expect(response.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("fails safely when SMTP env vars are missing", async () => {
    delete process.env.CONTACT_SMTP_PASS;

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          company: "OWL Partner",
          message: "We want to talk about a pilot.",
        }),
      }) as never
    );

    expect(response.status).toBe(500);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
