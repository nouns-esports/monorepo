"use client";

import Link from "@/components/Link";
import Text from "./Text";
import { ArrowRight, Dot } from "phosphor-react-sc";
import { useContext } from "react";
import { PrimaryColorContext } from "@/providers/PrimaryColor";
import { Event } from "@/server/resolve/events";
import { Locale } from "@/middleware";
import { usePathname } from "next/navigation";
import { env } from "@/env";

const defaultBanner: { url: string; text: Record<Locale, string> } = {
  url:
    env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? "https://github.com/nouns-esports/monorepo"
      : "https://nouns.wtf/vote/466",
  text: {
    en:
      env.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? "This site is currently in development mode"
        : "We're extending our rosters for another year!",
    pt:
      env.NEXT_PUBLIC_ENVIRONMENT === "development"
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

  const pathname = usePathname();

  if (!pathname.includes("/dashboard")) {
    return (
      <Link
        href={live ? props.events[0].htmlLink : defaultBanner.url}
        style={{
          background:
            env.NEXT_PUBLIC_ENVIRONMENT === "development"
              ? "repeating-linear-gradient(-45deg, #F2B517, #F2B517 15px, #141617 15px, #141617 30px)"
              : primaryColor,
          height:
            env.NEXT_PUBLIC_ENVIRONMENT === "development" ? "3rem" : undefined,
        }}
        className="relative z-20 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
      >
        <div
          style={{
            backgroundColor:
              env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "#F2B517"
                : undefined,
            color:
              env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "black"
                : undefined,
            fontFamily:
              env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "var(--font-bebas-neue)"
                : undefined,
            fontSize:
              env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "1.25rem"
                : undefined,
            paddingTop:
              env.NEXT_PUBLIC_ENVIRONMENT === "development" ? "5px" : undefined,
            paddingBottom:
              env.NEXT_PUBLIC_ENVIRONMENT === "development" ? "2px" : undefined,
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
}
