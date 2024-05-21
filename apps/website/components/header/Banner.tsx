"use client";

import Link from "@/components/Link";
import { ArrowRight, Dot } from "phosphor-react-sc";
import { type Event } from "@/server/queries/events";
import { usePathname } from "next/navigation";

export default function Banner(props: { events: Event[] }) {
  const start = new Date(props.events[0].start.dateTime);
  const end = new Date(
    props.events[0].end?.dateTime || Date.now() + 60 * 60 * 1000
  );

  const live = Date.now() > start.getTime() && Date.now() < end.getTime();

  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Link
        href={live ? props.events[0].htmlLink : "https://nouns.wtf/vote/466"}
        className="bg-red relative z-30 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
      >
        <div className="flex items-center justify-center">
          {live ? <Dot className="-mr-5 w-16 h-16 animate-pulse" /> : ""}
          {live
            ? `${props.events[0].summary.split("] ")[1]} is happening now`
            : "We're extending our rosters for another year!"}
          <ArrowRight weight="bold" className="w-4 h-4 ml-1.5" />
        </div>
      </Link>
    );
  }
}
