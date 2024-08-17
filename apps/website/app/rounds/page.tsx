import Link from "@/components/Link";
import { getRounds, getStats } from "@/server/queries/rounds";
import RoundCard from "@/components/RoundCard";
import { Minus, Plus } from "lucide-react";

export default async function Rounds(props: {
  searchParams: { showAll: boolean };
}) {
  const [activeRounds, upcomingRounds, endedRounds, stats] = await Promise.all([
    getRounds({ stage: "active" }),
    getRounds({ stage: "upcoming" }),
    getRounds({
      stage: "ended",
      limit: props.searchParams.showAll ? undefined : 8,
    }),
    getStats(),
  ]);

  return (
    <div className="flex flex-col justify-center gap-16 max-sm:gap-8 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex max-lg:flex-col max-lg:items-start max-lg:gap-4 items-center justify-between gap-16 mt-8">
        <div className="flex flex-col gap-4">
          <h1 className="font-luckiest-guy text-white text-4xl">Rounds</h1>
          <p className="max-w-screen-sm max-lg:max-w-none">
            Welcome to Rounds, where the Nouns community plays an active role in
            deciding who and what we fund, making a real impact with every vote.
            Here, anyone can submit a proposal, and everyone has the power to
            vote! By participating and supporting Nouns and our partners, you
            can level up your account, gain additional voting power, and unlock
            unique opportunities.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full max-w-screen-sm max-lg:max-w-none h-40 py-4">
          <div className="flex flex-col w-full h-full rounded-xl bg-grey-800 p-4">
            Rounds Created
            <p className="text-white text-2xl font-semibold w-full h-full items-center flex justify-center">
              {stats.roundsCreated}
            </p>
          </div>
          <div className="flex flex-col w-full h-full rounded-xl bg-grey-800 p-4">
            Funds Deployed
            <p className="text-white text-2xl font-semibold w-full h-full items-center flex justify-center">
              ${stats.fundsDeployed.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col w-full h-full rounded-xl bg-grey-800 p-4 max-lg:flex max-sm:hidden">
            Total Participants
            <p className="text-white text-2xl font-semibold w-full h-full items-center flex justify-center">
              {stats.totalParticipants}
            </p>
          </div>
        </div>
      </div>
      {activeRounds.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">
            Happening Now
          </h2>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-4">
            {activeRounds.map((round) => (
              <RoundCard
                key={round.id}
                id={round.id}
                image={round.image}
                name={round.name}
                start={round.start}
                votingStart={round.votingStart}
                end={round.end}
                community={{
                  id: round.community.id,
                  name: round.community.name,
                  image: round.community.image,
                }}
              />
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
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-4">
            {upcomingRounds.map((round) => (
              <RoundCard
                key={round.id}
                id={round.id}
                image={round.image}
                name={round.name}
                start={round.start}
                votingStart={round.votingStart}
                end={round.end}
                community={{
                  id: round.community.id,
                  name: round.community.name,
                  image: round.community.image,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl">Completed</h2>
        <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:gap-4 gap-4">
          {endedRounds.map((round) => (
            <RoundCard
              key={round.id}
              id={round.id}
              image={round.image}
              name={round.name}
              start={round.start}
              votingStart={round.votingStart}
              end={round.end}
              community={{
                id: round.community.id,
                name: round.community.name,
                image: round.community.image,
              }}
            />
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
