import { describe, expect, it } from "vitest";
import { localePath, toAbsoluteUrl } from "@/lib/seo/site";

describe("site helpers", () => {
  it("builds locale paths", () => {
    expect(localePath("en", "/products")).toBe("/en/products");
    expect(localePath("tr", "/")).toBe("/tr");
  });

  it("builds absolute URLs on canonical host", () => {
    expect(toAbsoluteUrl("/en")).toBe("https://www.owlintelligence.co.uk/en");
  });
});
