"use client";

import { Game } from "@/db/schema";
import i18nConfig from "@/i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";
import Link from "next/link";
import { Locale } from "./SelectLanguage";

export default function GameCard(props: { game: Game }) {
  const locale = useCurrentLocale(i18nConfig) as Locale;

  return (
    <Link
      href={`${locale === "en" ? "" : `/${locale}`}/games/${props.game.id}`}
      style={{ backgroundImage: `url(${props.game.image})` }}
      className="relative w-[calc(25%_-_3rem)] max-xl:w-[calc(25%_-_1.5rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[12rem] rounded-xl select-none aspect-square group overflow-hidden"
    >
      <img
        src={props.game.image}
        alt={props.game.name}
        className="object-cover object-center absolute w-full top-0 h-full brightness-[85%] group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 w-full h-full grid place-items-center shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="drop-shadow-2xl text-center p-4 text-5xl max-2xl:text-4xl max-sm:text-3xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.game.name}
        </h3>
      </div>
    </Link>
  );
}
