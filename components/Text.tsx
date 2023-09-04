"use client";

import type { Locale } from "./SelectLanguage";

import i18nConfig from "@/i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";

export default function Text(props: Record<Locale, string>) {
  const locale = useCurrentLocale(i18nConfig) as Locale;

  return props[locale];
}

// Use this instead to avoid sending the whole dictionary to the client
// import { currentLocale } from "next-i18n-router";
// import type { Locale } from "./SelectLanguage";

// export default function Text(props: Record<Locale, string>) {
//   const locale = currentLocale() as Locale;

//   return props[locale];
// }
