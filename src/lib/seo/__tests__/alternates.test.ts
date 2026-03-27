import { describe, expect, it } from "vitest";
import { buildAlternates } from "@/lib/seo/alternates";

describe("buildAlternates", () => {
  it("returns canonical and hreflang mappings", () => {
    const alternates = buildAlternates("en", "/products");

    expect(alternates?.canonical).toBe(
      "https://www.owlintelligence.co.uk/en/products"
    );
    expect(alternates?.languages?.en).toBe(
      "https://www.owlintelligence.co.uk/en/products"
    );
    expect(alternates?.languages?.tr).toBe(
      "https://www.owlintelligence.co.uk/tr/products"
    );
    expect(alternates?.languages?.["x-default"]).toBe(
      "https://www.owlintelligence.co.uk/en/products"
    );
  });
});
