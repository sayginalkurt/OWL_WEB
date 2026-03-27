import { defaultLocale, type Locale } from "@/i18n/config";
import { toAbsoluteUrl } from "@/lib/seo/site";

export function websiteSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OWL Intelligence",
    url: toAbsoluteUrl(`/${locale}`),
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${toAbsoluteUrl(`/${locale}`)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
