import { defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "seoTitle",
      title: "Meta Title",
      type: "localizedString",
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        const entries = Object.values(value as Record<string, string>).filter(Boolean);
        const tooLong = entries.find((entry) => entry.length > 60);
        return tooLong ? "Meta title should stay under 60 characters." : true;
      }),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "localizedString",
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        const entries = Object.values(value as Record<string, string>).filter(Boolean);
        const tooLong = entries.find((entry) => entry.length > 160);
        return tooLong ? "Meta description should stay under 160 characters." : true;
      }),
    },
    {
      name: "ogTitle",
      title: "Open Graph Title",
      type: "localizedString",
    },
    {
      name: "ogDescription",
      title: "Open Graph Description",
      type: "localizedString",
    },
    {
      name: "ogImage",
      title: "OG Image",
      type: "image",
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL Override",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["https"] }).custom((value) => {
          if (!value) return true;
          const normalizedValue = String(value);
          return normalizedValue.startsWith("https://www.owlintelligence.co.uk/")
            ? true
            : "Canonical URL must start with https://www.owlintelligence.co.uk/";
        }),
    },
    {
      name: "noindex",
      title: "Noindex",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "nofollow",
      title: "Nofollow",
      type: "boolean",
      initialValue: false,
    },
  ],
});
