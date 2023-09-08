"use client";

import i18nConfig from "@/i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";
import { Locale } from "./SelectLanguage";

export default function Date(props: { timestamp: string }) {
  const locale = useCurrentLocale(i18nConfig) as Locale;

  const date = new (typeof window === "undefined" ? global : window).Date(
    props.timestamp
  );

  return `${date.toLocaleDateString(locale, {
    dateStyle: "medium",
  })} -
  ${date.toLocaleTimeString(locale, {
    timeStyle: "short",
  })}`;
}
