import { getAuthenticatedUser, getUserStats } from "@/server/queries/users";
import { getUserAwards } from "@/server/queries/awards";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import RankChart from "@/components/RankChart";
import { getCurrentRanks } from "@/server/queries/ranks";
import Countdown from "@/components/Countdown";
import { twMerge } from "tailwind-merge";
import Link from "@/components/Link";
import { getCurrentRankings, getUserRankings } from "@/server/queries/rankings";
import DateComponent from "@/components/Date";
import {
  Fullscreen,
  Link2,
  Maximize,
  Maximize2,
  Settings,
  Sparkles,
} from "lucide-react";
import CheckDiscordServer from "@/components/CheckDiscordServer";
import { revalidatePath } from "next/cache";
import { ToggleModal } from "@/components/Modal";
import SettingsModal from "@/components/modals/SettingsModal";
import { Level } from "@/components/Level";
import SignInButton from "@/components/SignInButton";
import { CaretDown, CaretUp } from "phosphor-react-sc";
import Achievements from "@/components/Achievements";

export default async function NexusPage(props: {
  searchParams: {
    privy_oauth_state?: string;
  };
}) {
  const [user, ranks] = await Promise.all([
    getAuthenticatedUser(),
    getCurrentRanks(),
  ]);

  if (!user || !user.nexus) {
    return (
      <div className="flex flex-col gap-4 items-center h-screen justify-center">
        <p className="text-white text-3xl font-luckiest-guy leading-none">
          You are not signed in
        </p>
        <Button href="/">Home</Button>
      </div>
    );
  }

  const [
    // awards,
    userRankings,
    rankings,
    userStats,
  ] = await Promise.all([
    // user ? getUserAwards({ user: user.id }) : [],
    getUserRankings({ user: user.id }),
    getCurrentRankings(),
    getUserStats({ user: user.id }),
  ]);

  const now = new Date();
  const nextUpdate = new Date(now);
  nextUpdate.setUTCHours(20, 0, 0, 0); // 3pm CST is 8pm UTC
  if (nextUpdate <= now) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-8 max-sm:gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 max-sm:gap-3">
            <img
              src={user.nexus.image}
              className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full"
            />
            <h1 className="text-3xl font-luckiest-guy text-white max-sm:text-2xl overflow-hidden max-sm:max-w-60 max-[500px]:max-w-40 max-[425px]:max-w-24">
              {user.nexus.name}
            </h1>
          </div>
          <div className="flex items-center gap-6 max-sm:gap-4">
            <ToggleModal
              id="settings"
              className="text-red flex items-center gap-1.5 hover:text-red/80 transition-colors"
            >
              Settings <Settings className="w-4 h-4" />
            </ToggleModal>
            <Button href={`/users/${user.nexus.discord ?? user.id}`}>
              <p>
                <span className="max-sm:hidden">View </span> Profile
              </p>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 grid-rows-2">
          {user.nexus.rank && userRankings.length > 0 ? (
            <div className="bg-grey-800 col-span-2 max-lg:col-span-4 rounded-xl flex flex-col p-4 gap-4 h-[400px]">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-white">Your Rank</h2>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-3xl font-bebas-neue"
                      style={{
                        color: user.nexus.rank.color,
                      }}
                    >
                      {user.nexus.rank.name}
                    </p>
                    <img
                      src={user.nexus.rank.image}
                      className="h-10 object-contain"
                    />
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <h2 className="">Updates in</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-white">
                      <Countdown date={nextUpdate} />
                    </p>
                  </div>
                </div>
              </div>
              <RankChart userRankings={userRankings} ranks={ranks} />
              <Level xp={user.nexus.xp} />
            </div>
          ) : (
            <div className="bg-grey-800 col-span-2 max-lg:col-span-4 rounded-xl flex flex-col items-center justify-center p-4 gap-4 h-[400px]">
              <div className="flex items-center gap-4">
                <img src="/discord.jpg" className="w-10 h-10 rounded-md" />
                <p className="text-white text-2xl font-bebas-neue leading-none">
                  You are not ranked
                </p>
              </div>
              <p className="text-white text-sm flex items-center gap-2">
                Join the{" "}
                <Link
                  href="/discord"
                  className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
                  newTab
                >
                  Discord server <Link2 className="w-4 h-4" />
                </Link>{" "}
                to get started
              </p>
              <CheckDiscordServer user={user} />
            </div>
          )}
          <div className="bg-grey-800 rounded-xl flex flex-col max-xl:col-span-2 max-md:col-span-4 gap-4 p-4 overflow-hidden h-[400px]">
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
              {rankings.map((ranking) => {
                if (!ranking.user) return;
                if (!ranking.rank) return;

                return (
                  <Link
                    href={`/users/${ranking.user.discord ?? ranking.user.id}`}
                    key={ranking.id}
                    className={twMerge(
                      "flex justify-between items-center hover:bg-grey-500 transition-colors p-2 rounded-lg",
                      ranking.user.id === user.id &&
                        "bg-blue-700 hover:bg-blue-800 sticky top-0 bottom-0"
                    )}
                  >
                    <div className="flex gap-4 items-center">
                      <p className="text-white w-6">{ranking.position}</p>
                      <div className="flex gap-2 items-center">
                        <img
                          src={ranking.user.image}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <p className="text-white">{ranking.user.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      {ranking.diff !== 0 ? (
                        <div
                          className={twMerge(
                            "flex items-center gap-1",
                            ranking.user.id === user.id
                              ? "text-white"
                              : ranking.diff > 0
                                ? "text-green"
                                : "text-red"
                          )}
                        >
                          {ranking.diff > 0 ? (
                            <CaretUp className="w-4 h-4" weight="fill" />
                          ) : (
                            <CaretDown className="w-4 h-4" weight="fill" />
                          )}
                          {Math.abs(ranking.diff)}
                        </div>
                      ) : null}
                      <img
                        title={ranking.rank.name}
                        className="w-6 h-6 object-contain"
                        src={ranking.rank.image}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col gap-4 p-4 justify-between h-[400px] max-xl:col-span-2 max-md:col-span-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bebas-neue leading-none">
                  Stats
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                  <p className="">All Time XP</p>
                  <p className="text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green" />
                    {user.nexus.xp}
                  </p>
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
          <div className="bg-grey-800 relative rounded-xl flex flex-col gap-4 p-4 h-[400px] col-span-2">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-white text-2xl font-bebas-neue leading-none">
                Achievements
              </h2>
              <Maximize2 className="w-5 h-5 text-white" />
            </div>
            <div className="bg-grey-600 rounded-xl relative w-full h-full overflow-hidden">
              <Achievements user={user} />
            </div>
          </div>
        </div>
      </div>
      {user && <SettingsModal user={user} />}
    </div>
  );
}
