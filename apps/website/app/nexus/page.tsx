import { getAuthenticatedUser } from "@/server/queries/users";
import { getUserAwards } from "@/server/queries/awards";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import RankChart from "@/components/RankChart";
import { getCurrentRanks } from "@/server/queries/ranks";
import Countdown from "@/components/Countdown";
import { twMerge } from "tailwind-merge";
import Link from "@/components/Link";

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

  const awards = user ? await getUserAwards({ user: user.id }) : undefined;

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
        <div className="flex flex-col gap-4">
          <div className="flex h-96 w-full gap-4">
            <div className="h-full bg-grey-800 aspect-video rounded-xl flex flex-col p-4 gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-white">Your Rank</h2>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-3xl font-bebas-neue"
                      style={{
                        color:
                          user.rank.place < 3
                            ? "#789AF4"
                            : user.rank.place < 6
                              ? "#BC30ED"
                              : "#E93737",
                      }}
                    >
                      {user.rank.name}
                    </p>
                    <img
                      src="https://preview.redd.it/netazqnuhws61.png?width=640&crop=smart&auto=webp&s=f4750509f526243900b89ae6b46a95614044aaa6"
                      // src={user.rank.image}
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <h2 className="">Updates in</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-white">
                      <Countdown
                        date={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <RankChart rank={user.rank} ranks={ranks} />
            </div>
            <div className="h-full bg-grey-800 w-full rounded-xl flex flex-col gap-4 p-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bebas-neue">
                  Leaderboard
                </h2>
                <Tabs
                  id="leaderboard"
                  selected={props.searchParams.leaderboard ?? "global"}
                  options={{
                    global: "Global",
                    friends: "Friends",
                  }}
                />
              </div>
              <div className="relative flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                <div className="sticky top-0 flex justify-between items-center rounded-lg p-2 bg-blue-700">
                  <div className="flex gap-4 items-center">
                    <p className="text-white w-8">{44}</p>
                    <div className="flex gap-2 items-center">
                      <img src={user.image} className="w-6 h-6 rounded-full" />
                      <p className="text-white">{user.name}</p>
                    </div>
                  </div>
                  <p className="text-white">{500}</p>
                </div>
                {ranks.map((rank, index) => (
                  <Link
                    href={`/users/${rank.name}`}
                    key={rank.name}
                    className="flex justify-between items-center hover:bg-grey-500 transition-colors p-2 rounded-lg"
                  >
                    <div className="flex gap-4 items-center">
                      <p className="text-white w-8">{index + 1}</p>
                      <div className="flex gap-2 items-center">
                        <img
                          src={rank.image}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="text-white">{rank.name}</p>
                      </div>
                    </div>
                    <p className="text-white">{rank.place}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="h-full bg-grey-800 w-full rounded-xl flex flex-col p-4 gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bebas-neue">Stats</h2>
                <Tabs
                  id="stats"
                  selected={props.searchParams.stats ?? "all-time"}
                  options={{
                    "all-time": "All Time",
                    "this-season": "This Season",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                  <p className="">Earned XP</p>
                  <p className="text-white">1432</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Votes Cast</p>
                  <p className="text-white">142</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Proposals Created</p>
                  <p className="text-white">2</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="">Quests Completed</p>
                  <p className="text-white">13</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-96 flex gap-4">
            <div className="h-full bg-grey-800 rounded-xl flex items-center justify-center w-96 flex-shrink-0">
              Awards
            </div>
            <div className="w-full h-full bg-grey-800 rounded-xl flex items-center justify-center">
              Inventory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs(props: {
  id: string;
  selected: string;
  options: Record<string, string>;
}) {
  return (
    <div className="flex items-center gap-1 bg-grey-600 rounded-lg px-1 py-1 text-sm">
      {Object.entries(props.options).map(([key, name]) => (
        <Link
          key={key}
          href={`/nexus?${props.id}=${key}`}
          className={twMerge(
            "px-2 py-0.5 rounded-lg hover:bg-grey-500 hover:text-white transition-colors",
            props.selected === key && "bg-grey-500 text-white"
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
