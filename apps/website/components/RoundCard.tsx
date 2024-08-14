import Link from "./Link";
import { Timer } from "lucide-react";
import { roundState } from "@/utils/roundState";
import Countdown from "@/components/rounds/Countdown";
import type { Community, Round } from "~/packages/db/schema";

export default function RoundCard(props: {
  id: Round["id"];
  image: Round["image"];
  name: Round["name"];
  start: Round["start"];
  votingStart: Round["votingStart"];
  end: Round["end"];
  community: { name: Community["name"]; image: Community["image"] };
}) {
  const state = roundState({
    start: props.start,
    votingStart: props.votingStart,
    end: props.end,
  });

  return (
    <Link
      href={`/rounds/${props.id}`}
      className="flex flex-col w-full group hover:opacity-80 transition-opacity bg-grey-600 rounded-xl overflow-hidden"
    >
      <div className="flex flex-col gap-8 bg-grey-800 transition-colors p-4 h-full rounded-xl">
        <div className="flex justify-between items-center">
          <img
            src={props.image}
            className="w-14 h-14 max-2xl:w-12 max-2xl:h-12 rounded-lg object-cover"
          />
          <div className="bg-grey-600 py-2 pl-2 pr-3 rounded-full flex text-white items-center gap-2 text-sm font-semibold">
            <img src={props.community.image} className="w-5 h-5 rounded-full" />
            {props.community.name}
          </div>
        </div>
        <div className="flex justify-center flex-col gap-1">
          <h3 className="text-2xl max-2xl:text-[1.4rem] font-bebas-neue text-white line-clamp-2 min-h-[2lh]">
            {props.name}
          </h3>
        </div>
      </div>
      <div className="py-2.5 w-full text-grey-200 text-sm px-3 flex justify-between items-center">
        <div className="flex gap-1.5">
          <Timer className="w-4 h-4" />
          <p className="mt-[1px] leading-none">
            {state === "Upcoming" ? "Round starts" : ""}
            {state === "Proposing" ? "Voting starts" : ""}
            {state === "Voting" ? "Round ends" : ""}
            {state === "Ended" ? "Round ended" : ""}
          </p>
        </div>
        {state === "Ended" ? (
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(props.end ?? Infinity))
        ) : (
          <Countdown
            date={
              state === "Upcoming"
                ? new Date(props.start)
                : state === "Proposing"
                  ? new Date(props.votingStart)
                  : new Date(props.end ?? Infinity)
            }
          />
        )}
      </div>
    </Link>
  );
}
