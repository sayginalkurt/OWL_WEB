import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  localePath,
  toAbsoluteUrl,
} from "@/lib/seo/site";

type LanguagesAlternates = NonNullable<
  NonNullable<Metadata["alternates"]>["languages"]
>;

export function buildAlternates(
  locale: Locale,
  pathname: string
): Metadata["alternates"] {
  const canonicalPath = localePath(locale, pathname);
  const languages: LanguagesAlternates = {};

  for (const localeKey of SUPPORTED_LOCALES) {
    languages[localeKey] = toAbsoluteUrl(localePath(localeKey, pathname));
  }

  languages["x-default"] = toAbsoluteUrl(localePath(DEFAULT_LOCALE, pathname));

  return {
    canonical: toAbsoluteUrl(canonicalPath),
    languages,
  };
}
