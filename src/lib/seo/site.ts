import { defaultLocale, locales, type Locale } from "@/i18n/config";

const FALLBACK_SITE_URL = "https://www.owlintelligence.co.uk";

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
);

export const SUPPORTED_LOCALES = locales;
export const DEFAULT_LOCALE = defaultLocale;

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function withLeadingSlash(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function localePath(locale: Locale, pathname = "/"): string {
  const normalized = pathname === "/" ? "" : withLeadingSlash(pathname);
  return `/${locale}${normalized}`;
}

export function toAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${withLeadingSlash(pathname)}`;
}
