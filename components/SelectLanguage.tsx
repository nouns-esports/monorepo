"use client";

import { useState } from "react";
import { CaretDown } from "phosphor-react-sc";
import Link from "next/link";
import { useParams } from "next/navigation";
import { locales } from "@/utils/fetchCollection";

export function SelectLanguage() {
  const [open, setOpen] = useState(false);

  const { locale } = useParams();

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative flex items-center gap-3 select-none text-white font-cabin cursor-pointer bg-black/60 p-2 rounded-full"
    >
      <img src={`/lang/${locale}.svg`} draggable={false} className="w-6 h-6" />
      {locales[locale as string]}
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
                href={`/${_locale}`}
                scroll={false}
                className="flex gap-3 px-2 py-1 first:pt-2 last:pb-2 select-none"
              >
                <img
                  src={`/lang/${_locale}.svg`}
                  draggable={false}
                  className="w-6 h-6"
                />
                {locales[_locale]}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
