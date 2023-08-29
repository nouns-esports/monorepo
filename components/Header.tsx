"use client";

import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "@/i18nConfig";
import Button from "./Button";
import { Locale, locales, useDictionary } from "../lang/dictionaries";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";

export default function Header() {
  const { locale, dictionary } = useDictionary();

  return (
    <>
      <Banner />
      <header className="sticky top-0 w-full z-20">
        <div className="absolute top-0 w-full flex items-center justify-between p-8">
          <div className="flex items-center gap-8">
            <a
              href="/"
              draggable={false}
              className="flex gap-4 group items-center cursor-pointer select-none"
            >
              <img
                src="/logo.svg"
                className="group-hover:rotate-[14deg] w-12 transition-transform duration-150"
              />
              <p className="text-white font-luckiest-guy text-4xl select-none">
                Nouns
              </p>
            </a>
            <SelectLanguage locale={locale} />
          </div>
          <nav className="flex items-center gap-8 cursor-pointer">
            <div className="flex gap-6 max-lg:hidden">
              <HeaderLink href="/getfunded">
                {dictionary("getFunded")}
              </HeaderLink>
              <HeaderLink href="/about">{dictionary("about")}</HeaderLink>
              <HeaderLink href="/shop">{dictionary("shop")}</HeaderLink>
            </div>
            <a
              href="https://pog.nouns.gg"
              className="flex gap-2 items-center group max-[700px]:hidden"
            >
              <img
                src="/logo-white.svg"
                alt="POG logo"
                className="w-6 h-6 group-hover:rotate-[14deg] transition-transform duration-150"
              />
              <p className="text-white font-luckiest-guy text-xl">POG</p>
            </a>
            <div className="max-[700px]:hidden">
              <Button href={"https://nouns.wtf"}>{dictionary("joinUs")}</Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function Banner() {
  const { locale, dictionary } = useDictionary();
  //   const start = new Date(schedule[0].start.dateTime);
  //   const end = new Date(
  //     schedule[0].end?.dateTime || Date.now() + 60 * 60 * 1000
  //   );

  //   const live = Date.now() > start.getTime() && Date.now() < end.getTime();
  return (
    <Link
      href="/mint"
      // href={live ? schedule[0].htmlLink : banner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-20 h-9 bg-red hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
    >
      {/* {live ? (
        <img
          src="/icons/dot.svg"
          className="mr-2 w-2 animate-pulse"
          alt="Live event icon"
        />
      ) : (
        ""
      )}
      {live
        ? `${schedule[0].summary.split("] ")[1]} is happening now`
        : banner.message} */}
      {dictionary("banner")}
      <ArrowRight weight="bold" className="w-4 h-4 ml-1.5" />
    </Link>
  );
}

function HeaderLink(props: { href: string; children: React.ReactNode }) {
  const newTab =
    props.href.includes("://") || ["/shop", "/getfunded"].includes(props.href);

  return (
    <Link
      href={props.href}
      draggable={false}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
      className="hover:text-white/60 text-white transition-colors select-none text-lg font-medium"
    >
      {props.children}
    </Link>
  );
}

function SelectLanguage(props: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative flex items-center gap-3 text-white font-cabin cursor-pointer bg-black/60 p-2 rounded-full"
    >
      <img src={`/lang/${props.locale}.svg`} className="w-6 h-6" />
      {locales[props.locale]}
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
          (locale) =>
            locale !== props.locale && (
              <Link
                key={locale}
                href={`/${locale}`}
                scroll={false}
                className="flex gap-3 px-2 py-1 first:pt-2 last:pb-2"
              >
                <img src={`/lang/${locale}.svg`} className="w-6 h-6" />
                {locales[locale as Locale]}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
