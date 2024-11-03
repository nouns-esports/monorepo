import Link from "@/components/Link";
import { getRounds, getRoundsStats } from "@/server/queries/rounds";
import RoundCard from "@/components/RoundCard";

export default async function Rounds() {
  const [activeRounds, upcomingRounds, endedRounds, stats] = await Promise.all([
    getRounds({ stage: "active" }),
    getRounds({ stage: "upcoming" }),
    getRounds({
      stage: "ended",
    }),
    getRoundsStats(),
  ]);

  return (
    <div className="flex flex-col justify-center gap-16 max-sm:gap-8 w-full pt-32 max-xl:pt-28 max-sm:pt-20">
      <div className="flex max-lg:flex-col max-lg:items-start max-lg:gap-4 items-center justify-between gap-16 mt-8 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
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
          <h2 className="text-white font-luckiest-guy text-3xl pl-32 max-2xl:pl-16 max-xl:pl-8 max-sm:pl-4">
            Happening Now
          </h2>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:flex max-lg:overflow-x-scroll max-lg:scrollbar-hidden gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
            {activeRounds.map((round) => (
              <RoundCard
                key={round.id}
                id={round.id}
                image={round.image}
                name={round.name}
                start={round.start}
                votingStart={round.votingStart}
                end={round.end}
                community={
                  round.community
                    ? {
                        id: round.community.id,
                        name: round.community.name,
                        image: round.community.image,
                      }
                    : undefined
                }
                className="max-lg:w-80 max-lg:flex-shrink-0"
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {upcomingRounds.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl pl-32 max-2xl:pl-16 max-xl:pl-8 max-sm:pl-4">
            Starting Soon
          </h2>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:flex max-lg:overflow-x-scroll max-lg:scrollbar-hidden gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
            {upcomingRounds.map((round) => (
              <RoundCard
                key={round.id}
                id={round.id}
                image={round.image}
                name={round.name}
                start={round.start}
                votingStart={round.votingStart}
                end={round.end}
                community={
                  round.community
                    ? {
                        id: round.community.id,
                        name: round.community.name,
                        image: round.community.image,
                      }
                    : undefined
                }
                className="max-lg:w-80 max-lg:flex-shrink-0"
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-3xl pl-32 max-2xl:pl-16 max-xl:pl-8 max-sm:pl-4">
          Completed
        </h2>
        <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:flex max-lg:overflow-x-scroll max-lg:scrollbar-hidden gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
          {endedRounds.map((round) => (
            <RoundCard
              key={round.id}
              id={round.id}
              image={round.image}
              name={round.name}
              start={round.start}
              votingStart={round.votingStart}
              end={round.end}
              community={
                round.community
                  ? {
                      id: round.community.id,
                      name: round.community.name,
                      image: round.community.image,
                    }
                  : undefined
              }
              className="max-lg:w-80 max-lg:flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
