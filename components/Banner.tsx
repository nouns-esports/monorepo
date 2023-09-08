"use client";

import Link from "next/link";
import Text from "./Text";
import { ArrowRight, Dot } from "phosphor-react-sc";
import { useContext } from "react";
import { PrimaryColorContext } from "@/providers";
import { Event } from "@/utils/fetchEvents";

export default function Banner(props: { events: Event[] }) {
  const start = new Date(props.events[0].start.dateTime);
  const end = new Date(
    props.events[0].end?.dateTime || Date.now() + 60 * 60 * 1000
  );

  const live = Date.now() > start.getTime() && Date.now() < end.getTime();

  const primaryColor = useContext(PrimaryColorContext);

  return (
    <Link
      href={live ? props.events[0].htmlLink : "/mint"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: primaryColor }}
      className="relative z-20 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
    >
      {live ? <Dot className="mr-2 w-2 animate-pulse" /> : ""}
      {live ? (
        `${props.events[0].summary.split("] ")[1]} is happening now`
      ) : (
        <Text
          en="Celebrate esports summer with us!"
          pt="Comemore o verão dos esportes conosco!"
        />
      )}
      <ArrowRight weight="bold" className="w-4 h-4 ml-1.5" />
    </Link>
  );
}
