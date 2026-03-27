import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/seo/alternates";
import { localePath, toAbsoluteUrl } from "@/lib/seo/site";

type BuildPageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  robots?: Metadata["robots"];
  imagePath?: string;
};

const DEFAULT_OG_IMAGE = "/OWLLogo.png";

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  robots,
  imagePath = DEFAULT_OG_IMAGE,
}: BuildPageMetadataInput): Metadata {
  const path = localePath(locale, pathname);
  const absoluteUrl = toAbsoluteUrl(path);
  const absoluteImage = toAbsoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: buildAlternates(locale, pathname),
    robots,
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: "OWL Intelligence",
      images: [{ url: absoluteImage }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}
