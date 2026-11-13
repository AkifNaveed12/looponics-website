// Shared i18n configuration — used by proxy, layouts, and components

export const defaultLocale = "en" as const;

export const locales = [
  "en",
  "ar",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "tr",
  "ur",
  "hi",
  "zh-CN",
  "ja",
  "ko",
] as const;

export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar", "ur"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Display names for the language switcher (native script) */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  tr: "Türkçe",
  ur: "اردو",
  hi: "हिन्दी",
  "zh-CN": "简体中文",
  ja: "日本語",
  ko: "한국어",
};
