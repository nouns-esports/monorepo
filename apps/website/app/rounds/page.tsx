import Countdown from "@/components/rounds/Countdown";
import Link from "@/components/Link";
import type { Asset, Award, Round } from "~/packages/db/schema";
import { getRounds } from "@/server/queries/rounds";
import { roundState } from "@/utils/roundState";
import { twMerge } from "tailwind-merge";

export default async function Rounds() {
  const [activeRounds, upcomingRounds, endedRounds] = await Promise.all([
    getRounds({ stage: "active" }),
    getRounds({ stage: "upcoming" }),
    getRounds({ stage: "ended" }),
  ]);

  return (
    <div className="flex gap-32 w-full">
      <div className="flex flex-col gap-8 w-full">
        {activeRounds.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-white font-luckiest-guy text-3xl">
              Active Rounds
            </h2>
            {activeRounds.map((round) => (
              <RoundCard key={round.id} round={round} />
            ))}
          </div>
        ) : (
          ""
        )}
        {upcomingRounds.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-white font-luckiest-guy text-3xl">
              Upcoming Rounds
            </h2>
            {upcomingRounds.map((round) => (
              <RoundCard key={round.id} round={round} />
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">
            Completed Rounds
          </h2>
          {endedRounds.map((round) => (
            <RoundCard key={round.id} round={round} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center bg-white rounded-xl text-black w-full h-96">
        Round Explainer
      </div>
    </div>
  );
}

function RoundCard(props: {
  round: Round & { awards: (Award & { asset: Asset })[] };
}) {
  const state = roundState(props.round);

  return (
    <Link
      href={`/rounds/${props.round.id}`}
      className="w-full flex max-sm:flex-col max-sm:h-auto gap-4 bg-grey-800 rounded-xl overflow-hidden h-[9.25rem]"
    >
      <img
        src={props.round.image}
        alt={props.round.name}
        className="h-full object-cover aspect-square max-sm:h-32"
      />
      <div className="flex max-sm:flex-col gap-4 pr-4 max-sm:pl-4 max-sm:gap-0 pt-4 max-sm:pt-0">
        <div className="flex flex-col gap-2">
          <h3 className="font-bebas-neue text-3xl text-white leading-none">
            {props.round.name}
          </h3>
          <div className="relative h-full max-sm:h-24 overflow-hidden flex flex-col gap-1 text-grey-200">
            {props.round.description}
            <div className="absolute w-full bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0" />
          </div>
        </div>
        <div className="w-0.5 bg-grey-600 h-[calc(100%_-_16px)] max-sm:hidden flex-shrink-0" />
        <div className="flex flex-col gap-4 justify-center items-center px-4 pb-4 aspect-square h-full max-sm:flex-row max-sm:w-full max-sm:h-24">
          {state === "Proposing" || state === "Voting" ? (
            <>
              <div className="flex items-center justify-center">
                <div
                  className={twMerge(
                    "flex text-center text-white font-semibold text-xs rounded-full leading-none px-3 py-2",
                    state === "Proposing" && "bg-blue-700",
                    state === "Voting" && "bg-purple"
                  )}
                >
                  {state}
                </div>
              </div>
              <div className="w-0.5 bg-grey-600 h-full hidden max-sm:flex flex-shrink-0" />
            </>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 items-center max-sm:w-full">
            <p className="text-sm whitespace-nowrap text-grey-200">
              {state === "Starting" ? "Round starts" : ""}
              {state === "Proposing" ? "Voting starts" : ""}
              {state === "Voting" ? "Round ends" : ""}
              {state === "Ended" ? "Round ended" : ""}
            </p>
            <p className="text-white whitespace-nowrap">
              {state !== "Ended" ? (
                <Countdown
                  date={
                    state === "Starting"
                      ? new Date(props.round.start)
                      : state === "Proposing"
                        ? new Date(props.round.votingStart)
                        : new Date(props.round.end ?? Infinity)
                  }
                />
              ) : (
                new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(props.round.end ?? Infinity))
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
