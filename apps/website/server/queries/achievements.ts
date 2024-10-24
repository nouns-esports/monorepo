import type { AuthenticatedUser } from "./users";
import { unstable_cache as cache } from "next/cache";
import { db, xp } from "~/packages/db/schema";
import { and, eq, inArray } from "drizzle-orm";

import attendCall from "../achievements/attendCall";
import castVote from "../achievements/castVote";
import castVoteWinningProposal from "../achievements/castVoteWinningProposal";
import completeQuest from "../achievements/completeQuest";
import connectDiscord from "../achievements/connectDiscord";
import connectFarcaster from "../achievements/connectFarcaster";
import connectWallet from "../achievements/connectWallet";
import connectX from "../achievements/connectX";
import createProposal from "../achievements/createProposal";
import enterNexus from "../achievements/enterNexus";
import getAVote from "../achievements/getAVote";
import placeFirst from "../achievements/placeFirst";
import reachChallenger from "../achievements/reachChallenger";
import reachChampion from "../achievements/reachChampion";
import reachExplorer from "../achievements/reachExplorer";
import tenVoters from "../achievements/tenVoters";
import winARound from "../achievements/winARound";

export const checkAchievements: Record<
  string,
  (user: AuthenticatedUser) => Promise<boolean>
> = {
  attendCall,
  castVote,
  castVoteWinningProposal,
  completeQuest,
  connectDiscord,
  connectFarcaster,
  connectWallet,
  connectX,
  createProposal,
  enterNexus,
  getAVote,
  placeFirst,
  reachChallenger,
  reachChampion,
  reachExplorer,
  tenVoters,
  winARound,
};

export const getAchievementsProgress = cache(
  async (input: { user: AuthenticatedUser }) => {
    let progress: Record<string, "claimed" | "completed" | "incomplete"> = {};

    const claimRecords = await db.query.xp.findMany({
      where: and(
        eq(xp.user, input.user.id),
        inArray(xp.achievement, Object.keys(checkAchievements))
      ),
      columns: {
        achievement: true,
      },
    });

    await Promise.all(
      Object.entries(checkAchievements).map(async ([achievement, check]) => {
        if (claimRecords.find((record) => record.achievement === achievement)) {
          return (progress[achievement] = "claimed");
        }

        const completed = await check(input.user);

        if (completed) {
          return (progress[achievement] = "completed");
        }

        return (progress[achievement] = "incomplete");
      })
    );

    return progress;
  },
  ["getAchievementsProgress"],
  { tags: ["getAchievementsProgress"], revalidate: 60 * 10 }
);