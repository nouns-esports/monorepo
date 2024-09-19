import { getAuthenticatedUser, getUserStats } from "@/server/queries/users";
import { getUserAwards } from "@/server/queries/awards";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import RankChart from "@/components/RankChart";
import { getCurrentRanks } from "@/server/queries/ranks";
import Countdown from "@/components/Countdown";
import { twMerge } from "tailwind-merge";
import Link from "@/components/Link";
import { getCurrentRankings, getUserRankings } from "@/server/queries/rankings";
import DateComponent from "@/components/Date";
import { formatUnits } from "viem";

export default async function NexusPage(props: {
  searchParams: {
    leaderboard?: "friends" | "global";
    stats?: "all-time" | "this-season";
  };
}) {
  const [user, ranks] = await Promise.all([
    getAuthenticatedUser(),
    getCurrentRanks(),
  ]);

  if (!user) {
    notFound();
  }

  const [awards, userRankings, rankings, userStats] = await Promise.all([
    user ? getUserAwards({ user: user.id }) : [],
    getUserRankings({ user: user.id }),
    getCurrentRankings(),
    getUserStats({ user: user.id }),
  ]);

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={user.image} className="w-10 h-10 rounded-full" />
            <h1 className="text-3xl font-luckiest-guy text-white">
              {user.name}
            </h1>
          </div>
          <Button href={`/users/${user.handle}`}>View Profile</Button>
        </div>
        <div className="grid grid-cols-4 gap-4 grid-rows-2">
          {user.rank ? (
            <div className="bg-grey-800 col-span-2 max-lg:col-span-4 rounded-xl flex flex-col p-4 gap-4 h-96">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-white">Your Rank</h2>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-3xl font-bebas-neue"
                      style={{
                        color:
                          user.rank.place < 3
                            ? "#4990FD"
                            : user.rank.place < 6
                              ? "#DA00CB"
                              : "#F00000",
                      }}
                    >
                      {user.rank.name}
                    </p>
                    <img
                      src={user.rank.image}
                      className="h-10 object-contain"
                    />
                  </div>
                </div>
                {user.rank ? (
                  <div className="flex items-end flex-col gap-1">
                    <h2 className="">Updates in</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-white">
                        <Countdown
                          date={
                            new Date(
                              userRankings[userRankings.length - 1].timestamp
                            )
                          }
                        />
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <RankChart userRankings={userRankings} ranks={ranks} />
            </div>
          ) : (
            <div className="bg-grey-800 col-span-2 max-lg:col-span-4 rounded-xl flex flex-col items-center justify-center p-4 gap-4 h-96">
              <img src="/discord.jpg" className="w-12 h-12 rounded-md" />
              <p className="text-white text-2xl font-bebas-neue leading-none">
                You are not ranked
              </p>
              <p className="text-white text-sm">
                Join the Discord server to get started
              </p>
              <Button href="/discord" size="sm">
                Check
              </Button>
            </div>
          )}
          <div className="bg-grey-800 rounded-xl flex flex-col max-xl:col-span-2 max-md:col-span-4 gap-4 p-4 overflow-hidden h-96">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-2xl font-bebas-neue leading-none">
                Leaderboard
              </h2>
              {/* <Tabs
                  id="leaderboard"
                  selected={props.searchParams.leaderboard ?? "global"}
                  options={{
                    global: "Global",
                    friends: "Friends",
                  }}
                /> */}
            </div>
            <div className="relative flex flex-col gap-2 overflow-y-auto custom-scrollbar">
              {rankings.map((ranking) => (
                <Link
                  href={`/users/${ranking.user.handle}`}
                  key={ranking.id}
                  className={twMerge(
                    "flex justify-between items-center hover:bg-grey-500 transition-colors p-2 rounded-lg",
                    ranking.user.id === user.id &&
                      "bg-blue-700 hover:bg-blue-800 sticky top-0 bottom-0"
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <p className="text-white w-6">{ranking.place}</p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={ranking.user.image}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <p className="text-white">{ranking.user.name}</p>
                    </div>
                  </div>
                  <p className="text-white">{ranking.xp} xp</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col gap-4 p-4 justify-between h-96 max-xl:col-span-2 max-md:col-span-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bebas-neue leading-none">
                  Stats
                </h2>
                {/* <Tabs
                  id="stats"
                  selected={props.searchParams.stats ?? "all-time"}
                  options={{
                    "all-time": "All Time",
                    "this-season": "This Season",
                  }}
                /> */}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                  <p className="">Earned XP</p>
                  <p className="text-white">{userStats.earnedXP}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Votes Cast</p>
                  <p className="text-white">{userStats.votesCast}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Proposals Created</p>
                  <p className="text-white">{userStats.proposalsCreated}</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Quests Completed</p>
                  <p className="text-white">{userStats.questsCompleted}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Last updated on</p>
              <p className="text-white whitespace-nowrap">
                <DateComponent />
              </p>
            </div>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col p-4 h-96 max-2xl:col-span-2 max-xl:col-span-2 max-md:col-span-4 gap-4">
            <h2 className="text-white text-2xl font-bebas-neue leading-none">
              Awards
            </h2>
            <ul className="flex flex-col gap-4">
              {awards.map((award) => (
                <li
                  key={award.id}
                  className="flex items-center justify-between w-ful"
                >
                  <Link
                    href={`/rounds/${award.round.id}`}
                    className="flex gap-3 items-center text-white font-semibold"
                  >
                    <img
                      src={award.round.image}
                      className="w-8 h-8 rounded-md"
                    />
                    {award.round.id.replaceAll("-", " ")}
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="text-white gap-2 flex items-center">
                      <img
                        src={award.asset.image}
                        className="w-5 h-5 rounded-md"
                      />
                      {formatUnits(
                        BigInt(award.value),
                        award.asset.decimals ?? 0
                      )}
                    </div>
                    <div
                      className={twMerge(
                        "rounded-full px-2.5 py-0.5 text-sm font-semibold",
                        award.claimed
                          ? "text-white bg-green/90"
                          : "text-white bg-blue-700"
                      )}
                    >
                      {award.claimed ? "Paid" : "Queued"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col p-4 gap-4 col-span-3 max-2xl:col-span-2 max-xl:col-span-4 max-lg:col-span-2 max-md:col-span-4 h-96">
            <h2 className="text-white text-2xl font-bebas-neue leading-none">
              Inventory
            </h2>
            <p>You don't have any items yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
