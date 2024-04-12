import { query } from "@/app/api/query/server";
import Countdown from "@/components/Countdown";
import Link from "@/components/Link";
import { Round } from "@/db/schema";

export default async function Rounds() {
  const [activeRounds, upcomingRounds, endedRounds] = await Promise.all([
    query.getRounds({ stage: "active" }),
    query.getRounds({ stage: "upcoming" }),
    query.getRounds({ stage: "ended", max: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl">Active Rounds</h2>
        {activeRounds.map((round) => (
          <RoundCard key={round.id} round={round} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl">
          Upcoming Rounds
        </h2>
        {upcomingRounds.map((round) => (
          <RoundCard key={round.id} round={round} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl">Ended Rounds</h2>
        {endedRounds.map((round) => (
          <RoundCard key={round.id} round={round} />
        ))}
      </div>
    </div>
  );
}

function RoundCard(props: { round: Round }) {
  const now = new Date().getTime();

  const roundStart = new Date(props.round.start).getTime();
  const votingStart = new Date(props.round.votingStart).getTime();
  const roundEnd = new Date(props.round.end ?? Infinity).getTime();

  return (
    <Link
      href={`/rounds/${props.round.id}`}
      className="w-full flex gap-4 bg-darkgrey rounded-xl overflow-hidden h-[9.25rem]"
    >
      <div className="flex">
        <img
          src={props.round.image}
          alt={props.round.name}
          className="h-full object-cover aspect-square"
        />
        <div className="flex gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bebas-neue text-3xl text-white leading-none">
              {props.round.name}
            </h3>
            <p className="h-full leading-tight text-ellipsis line-clamp-4">
              {props.round.description}
            </p>
          </div>
          <div className="w-0.5 bg-grey h-full" />
          <div className="flex flex-col gap-4 items-center px-4 aspect-square h-full">
            {props.round.end && now < roundEnd ? (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm whitespace-nowrap">
                  {now < roundStart
                    ? "Round starts"
                    : now < votingStart
                      ? "Proposing ends"
                      : "Round ends"}
                </p>
                <p className="text-white whitespace-nowrap">
                  <Countdown
                    date={
                      now < roundStart
                        ? new Date(props.round.start)
                        : now < votingStart
                          ? new Date(props.round.votingStart)
                          : new Date(props.round.end)
                    }
                  />
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              <p className="text-sm whitespace-nowrap">Total prizes</p>
              <p className="text-white whitespace-nowrap">$1,000</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
