"use client";

import Link from "@/components/Link";
import Text from "./Text";
import { ArrowRight, Dot } from "phosphor-react-sc";
import { useContext } from "react";
import { PrimaryColorContext } from "@/providers";
import { Event } from "@/server/resolve/fetchEvents";
import { Locale } from "@/middleware";

const defaultBanner: { url: string; text: Record<Locale, string> } = {
  url: "/2024",
  text: {
    en: "We're extending our rosters for another year!",
    pt: "Estamos estendendo nossos roster por mais um ano!",
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
      style={{ backgroundColor: primaryColor }}
      className="relative z-20 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
    >
      {live ? <Dot className="mr-2 w-2 animate-pulse" /> : ""}
      {live ? (
        `${props.events[0].summary.split("] ")[1]} is happening now`
      ) : (
        <Text {...defaultBanner.text} />
      )}
      <ArrowRight weight="bold" className="w-4 h-4 ml-1.5" />
    </Link>
  );
}
