import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  COOKIE_CONSENT_KEY,
  CookieConsentBanner,
} from "../cookie-consent-banner";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
}));

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = `${COOKIE_CONSENT_KEY}=; Path=/; Max-Age=0`;
  });

  it("shows the localized consent banner when no preference is stored", async () => {
    render(<CookieConsentBanner />);

    expect(await screen.findByTestId("cookie-consent-banner")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Accept Cookies" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Privacy Policy" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Terms of Use" })
    ).toBeInTheDocument();
  });

  it("stays hidden after consent was already stored", async () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");

    render(<CookieConsentBanner />);

    await waitFor(() => {
      expect(
        screen.queryByTestId("cookie-consent-banner")
      ).not.toBeInTheDocument();
    });
  });
});
