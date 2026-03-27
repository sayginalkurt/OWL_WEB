import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "@/lib/seo/metadata";

describe("buildPageMetadata", () => {
  it("returns canonical and alternates metadata for locale routes", () => {
    const metadata = buildPageMetadata({
      locale: "tr",
      pathname: "/about",
      title: "Hakkimizda",
      description: "OWL Intelligence hakkinda bilgi.",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://www.owlintelligence.co.uk/tr/about"
    );
    expect(metadata.alternates?.languages?.en).toBe(
      "https://www.owlintelligence.co.uk/en/about"
    );
    expect(metadata.alternates?.languages?.tr).toBe(
      "https://www.owlintelligence.co.uk/tr/about"
    );
    expect(metadata.openGraph?.url).toBe(
      "https://www.owlintelligence.co.uk/tr/about"
    );
  });
});
