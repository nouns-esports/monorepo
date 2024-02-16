"use client";

import Link from "@/components/Link";
import Text from "./Text";
import { ArrowRight, Dot } from "phosphor-react-sc";
import { useContext } from "react";
import { PrimaryColorContext } from "@/providers/PrimaryColor";
import { Event } from "@/server/resolve/events";
import { Locale } from "@/middleware";

const defaultBanner: { url: string; text: Record<Locale, string> } = {
  url:
    process.env.NODE_ENV === "development"
      ? "https://github.com/nouns-esports/monorepo"
      : "https://nouns.wtf/vote/466",
  text: {
    en:
      process.env.NODE_ENV === "development"
        ? "This site is currently in development mode"
        : "We're extending our rosters for another year!",
    pt:
      process.env.NODE_ENV === "development"
        ? "This site is currently in development mode"
        : "Estamos estendendo nossos roster por mais um ano!",
  },
};

export default function Banner(props: { events: Event[]; locale: string }) {
  const start = new Date(props.events[0].start.dateTime);
  const end = new Date(
    props.events[0].end?.dateTime || Date.now() + 60 * 60 * 1000
  );

  const live = Date.now() > start.getTime() && Date.now() < end.getTime();

  const primaryColor = useContext(PrimaryColorContext);

  return (
    <Link
      href={live ? props.events[0].htmlLink : defaultBanner.url}
      style={{
        background:
          process.env.NODE_ENV === "development"
            ? "repeating-linear-gradient(-45deg, #F2B517, #F2B517 15px, #141617 15px, #141617 30px)"
            : primaryColor,
        height: process.env.NODE_ENV === "development" ? "3rem" : undefined,
      }}
      className="relative z-20 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
    >
      <div
        style={{
          backgroundColor:
            process.env.NODE_ENV === "development" ? "#F2B517" : undefined,
          color: process.env.NODE_ENV === "development" ? "black" : undefined,
          fontFamily:
            process.env.NODE_ENV === "development"
              ? "var(--font-bebas-neue)"
              : undefined,
          fontSize:
            process.env.NODE_ENV === "development" ? "1.25rem" : undefined,
          paddingTop:
            process.env.NODE_ENV === "development" ? "5px" : undefined,
          paddingBottom:
            process.env.NODE_ENV === "development" ? "2px" : undefined,
        }}
        className="flex items-center justify-center w-full"
      >
        {live ? <Dot className="-mr-5 w-16 h-16 animate-pulse" /> : ""}
        {live ? (
          `${props.events[0].summary.split("] ")[1]} is happening now`
        ) : (
          <Text {...defaultBanner.text} />
        )}
        <ArrowRight weight="bold" className="w-4 h-4 ml-1.5" />
      </div>
    </Link>
  );
}
