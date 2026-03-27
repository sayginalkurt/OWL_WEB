import { toAbsoluteUrl } from "@/lib/seo/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OWL Intelligence",
    url: toAbsoluteUrl("/"),
    logo: toAbsoluteUrl("/OWLLogo.png"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@owlintelligence.co.uk",
        availableLanguage: ["English", "Turkish"],
      },
    ],
  };
}
