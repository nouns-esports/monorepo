import type { Round } from "~/packages/db/schema";
import Link from "./Link";
import { twMerge } from "tailwind-merge";
import { Timer } from "lucide-react";
import { roundState } from "@/utils/roundState";
import Countdown from "@/components/rounds/Countdown";

export default function RoundCard(props: {
  round: Round & { [key: string]: any };
  simple?: boolean;
}) {
  const state = roundState(props.round);

  return (
    <Link
      href={`/rounds/${props.round.id}`}
      className="flex flex-col w-full group bg-grey-600 rounded-xl overflow-hidden"
    >
      <div
        className={twMerge(
          "flex flex-col gap-8 group-hover:bg-grey-600 bg-grey-800 transition-colors p-4 h-full rounded-xl",
          props.simple && "min-h-56 max-2xl:min-h-[auto]"
        )}
      >
        <div className="flex justify-between items-center">
          <img
            src={props.round.image}
            className="w-14 h-14 max-2xl:w-12 max-2xl:h-12 rounded-lg object-cover"
          />
          <p
            className={twMerge(
              "bg-red rounded-full px-3 py-1 text-[0.95rem] max-2xl:text-sm text-white font-semibold",
              state === "Proposing" && "bg-blue-700",
              state === "Voting" && "bg-purple",
              state === "Upcoming" && "bg-[#e6953a]"
            )}
          >
            {state}
          </p>
        </div>
        <div className="flex justify-center flex-col gap-1">
          <h3 className="text-2xl max-2xl:text-[1.4rem] max-2xl:leading-7 font-bebas-neue text-white line-clamp-1">
            {props.round.name}
          </h3>
          <p className="text-[1.05rem] leading-snug max-2xl:text-[0.95rem] line-clamp-2">
            {props.round.description}
          </p>
        </div>
      </div>
      {!props.simple ? (
        <div className="py-2.5 w-full text-grey-200 text-sm px-3 flex justify-between items-center">
          <div className="flex gap-1.5">
            <Timer className="w-4 h-4" />
            <p className="mt-[1px] leading-none">
              {state === "Upcoming" ? "Round starts" : ""}
              {state === "Proposing" ? "Voting starts" : ""}
              {state === "Voting" ? "Round ends" : ""}
            </p>
          </div>
          <Countdown
            date={
              state === "Upcoming"
                ? new Date(props.round.start)
                : state === "Proposing"
                  ? new Date(props.round.votingStart)
                  : new Date(props.round.end ?? Infinity)
            }
          />
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}
