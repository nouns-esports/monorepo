"use client";

import { useState } from "react";
import { CaretDown } from "phosphor-react-sc";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "@/i18nConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const locales = {
  en: "English",
  pt: "Português",
} as const;

export type Locale = keyof typeof locales;

export function SelectLanguage() {
  const [open, setOpen] = useState(false);

  const locale = useCurrentLocale(i18nConfig) as Locale;

  const pathname = usePathname();

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative flex items-center gap-3 text-white font-cabin cursor-pointer bg-black/60 p-2 rounded-full"
    >
      <img src={`/lang/${locale}.svg`} className="w-6 h-6" />
      {locales[locale]}
      <CaretDown
        weight="bold"
        className="mr-2 transition-transform"
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      />
      <div
        className="absolute -bottom-12 p-0 left-0 w-full flex flex-col bg-black/60 rounded-2xl transition-opacity"
        style={{ opacity: open ? "1" : "0" }}
      >
        {Object.keys(locales).map(
          (_locale) =>
            _locale !== locale && (
              <Link
                key={_locale}
                as={`/${_locale}`}
                href={`/[locale]`}
                passHref
                scroll={false}
                className="flex gap-3 px-2 py-1 first:pt-2 last:pb-2"
              >
                <img src={`/lang/${_locale}.svg`} className="w-6 h-6" />
                {locales[_locale as Locale]}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
