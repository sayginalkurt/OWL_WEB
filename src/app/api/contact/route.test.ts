import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const fetchMock = vi.fn();

describe("POST /api/contact", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    // @ts-expect-error - override global fetch for tests
    globalThis.fetch = fetchMock;

    process.env.CONTACT_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/test/exec";
    process.env.CONTACT_SHEETS_SECRET = "test-secret";
    process.env.CONTACT_FROM_EMAIL = "post@owlintelligence.co.uk";
    process.env.CONTACT_FROM_NAME = "OWL Intelligence";
    process.env.CONTACT_TO_EMAILS =
      "info@owlintelligence.co.uk,beyzapolat@fwbm.com.tr,sayginalkurt@fwbm.com.tr";
  });

  it("sends a validated contact submission via Sheets WebApp", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

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
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://script.google.com/macros/s/test/exec"
    );
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    const body = JSON.parse(String(init.body));
    expect(body.secret).toBe("test-secret");
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
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails safely when Sheets env vars are missing", async () => {
    delete process.env.CONTACT_SHEETS_WEBAPP_URL;

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
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats honeypot submissions as success without calling WebApp", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          company: "OWL Partner",
          message: "We want to talk about a pilot.",
          honeypot: "spam",
        }),
      }) as never
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
