"use client";

import type { Round } from "~/packages/db/schema";
import { twMerge } from "tailwind-merge";
import DateComponent from "./Date";
import { roundState } from "@/utils/roundState";
import { Check, Timer } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo } from "react";

export default function RoundTimeline(props: { round: Round }) {
  const state = roundState({
    start: props.round.start,
    votingStart: props.round.votingStart,
    end: props.round.end,
  });

  const { width } = useWindowSize();
  const short = useMemo(() => !!((width ?? 0) <= 600), [width]);

  return (
    <div className="bg-grey-800 w-full gap-2 rounded-xl flex flex-col flex-shrink-0 py-4 px-5 justify-between">
      <div className="flex items-center w-full">
        <p className="text-white w-full">
          {state === "Upcoming" ? "Round Starts" : "Round Started"}
        </p>
        <p className="text-white w-full text-center">
          {state === "Upcoming" || state === "Proposing"
            ? "Voting Starts"
            : "Voting Started"}
        </p>
        <p className="text-white w-full text-right">
          {state === "Ended" ? "Round Ended" : "Round Ends"}
        </p>
      </div>
      <div className="flex justify-between items-center w-full">
        {state === "Upcoming" ? <Active /> : <Completed />}
        <div
          className={twMerge(
            "w-full",
            state === "Upcoming"
              ? "border-2 border-dotted border-grey-500"
              : "h-1 bg-green"
          )}
        />
        {state === "Upcoming" || state === "Proposing" ? (
          <Upcoming />
        ) : state === "Voting" ? (
          <Active />
        ) : (
          <Completed />
        )}
        <div
          className={twMerge(
            "w-full",
            state === "Ended"
              ? "h-1 bg-green"
              : "border-2 border-dotted border-grey-500"
          )}
        />
        {state === "Ended" ? <Completed /> : <Upcoming />}
      </div>
      <div className="flex items-center w-full">
        <p className="w-full whitespace-nowrap">
          <DateComponent timestamp={props.round.start} short={short} />
        </p>
        <p className="w-full text-center whitespace-nowrap">
          <DateComponent timestamp={props.round.votingStart} short={short} />
        </p>
        <p className="w-full text-right whitespace-nowrap">
          <DateComponent
            timestamp={props.round.end ?? Infinity}
            short={short}
          />
        </p>
      </div>
    </div>
  );
}

function Completed() {
  return (
    <div className="rounded-full flex items-center justify-center h-8 w-8 bg-green flex-shrink-0 ">
      <Check className="h-4 w-4 text-white" />
    </div>
  );
}

function Active() {
  return (
    <div className="rounded-full bg-blue-700 flex items-center justify-center h-8 w-8 flex-shrink-0">
      <Timer className="h-4 w-4 text-white" />
    </div>
  );
}

function Upcoming() {
  return (
    <div className="rounded-full border-2 border-grey-500 border-dotted h-8 w-8 flex-shrink-0" />
  );
}
