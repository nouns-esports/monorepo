import Countdown from "@/components/rounds/Countdown";
import Link from "@/components/Link";
import type { Asset, Award, Round } from "~/packages/db/schema";
import { getRounds } from "@/server/queries/rounds";
import { roundState } from "@/utils/roundState";
import { twMerge } from "tailwind-merge";
import RoundCard from "@/components/RoundCard";
import { Minus, Plus } from "lucide-react";

export default async function Rounds(props: {
  searchParams: { showAll: boolean };
}) {
  const [activeRounds, upcomingRounds, endedRounds] = await Promise.all([
    getRounds({ stage: "active" }),
    getRounds({ stage: "upcoming" }),
    getRounds({
      stage: "ended",
      limit: props.searchParams.showAll ? undefined : 8,
    }),
  ]);

  return (
    <div className="flex flex-col justify-center gap-16 max-sm:gap-8 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      {activeRounds.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">
            Happening Now
          </h2>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-6">
            {activeRounds.map((round) => (
              <RoundCard key={round.id} round={round} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {upcomingRounds.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">
            Starting Soon
          </h2>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-6">
            {upcomingRounds.map((round) => (
              <RoundCard key={round.id} round={round} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl">Completed</h2>
        <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-6">
          {endedRounds.map((round) => (
            <RoundCard key={round.id} round={round} simple />
          ))}
        </div>
        <Link
          href={props.searchParams.showAll ? "/rounds" : `/rounds?showAll=true`}
          scroll={false}
          className="text-red text-lg flex items-center gap-2 mt-4 max-lg:mt-2"
        >
          {props.searchParams.showAll ? "View less" : "View more"}{" "}
          {props.searchParams.showAll ? (
            <Minus className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </Link>
      </div>
    </div>
  );
}
