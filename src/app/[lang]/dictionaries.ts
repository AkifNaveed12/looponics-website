import "server-only";

import type { Locale } from "@/i18n/config";

const dictionaries = {
  en: () =>
    import("./dictionaries/en.json").then((module) => module.default),
  ar: () =>
    import("./dictionaries/ar.json").then((module) => module.default),
  de: () =>
    import("./dictionaries/de.json").then((module) => module.default),
  fr: () =>
    import("./dictionaries/fr.json").then((module) => module.default),
  es: () =>
    import("./dictionaries/es.json").then((module) => module.default),
  it: () =>
    import("./dictionaries/it.json").then((module) => module.default),
  pt: () =>
    import("./dictionaries/pt.json").then((module) => module.default),
  nl: () =>
    import("./dictionaries/nl.json").then((module) => module.default),
  tr: () =>
    import("./dictionaries/tr.json").then((module) => module.default),
  ur: () =>
    import("./dictionaries/ur.json").then((module) => module.default),
  hi: () =>
    import("./dictionaries/hi.json").then((module) => module.default),
  "zh-CN": () =>
    import("./dictionaries/zh-CN.json").then((module) => module.default),
  ja: () =>
    import("./dictionaries/ja.json").then((module) => module.default),
  ko: () =>
    import("./dictionaries/ko.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
