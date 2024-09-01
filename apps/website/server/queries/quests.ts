import { db, quests, xp } from "~/packages/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { linkFarcaster } from "@/server/quests/farcaster/linkFarcaster";
import type createAction from "../quests/createAction";
import { castInChannel } from "../quests/farcaster/castInChannel";
import { followAccount } from "../quests/farcaster/followAccount";
import { followChannel } from "../quests/farcaster/followChannel";
import { visitSite } from "../quests/online/visitSite";
import { attendCall } from "../quests/discord/attendCall";
import { joinServer } from "../quests/discord/joinServer";
import { linkDiscord } from "../quests/discord/linkDiscord";
import { watchVideo } from "../quests/online/watchVideo";
import { linkWallet } from "../quests/onchain/linkWallet";
import { linkTwitter } from "../quests/twitter/linkTwitter";

export const actions: Record<string, ReturnType<typeof createAction>> = {
  // Discord
  attendCall,
  joinServer,
  linkDiscord,

  // Twitter
  linkTwitter,

  // Farcaster
  linkFarcaster,
  castInChannel,
  followAccount,
  followChannel,

  // Online
  visitSite,
  watchVideo,

  // Onchain
  linkWallet,
};

export async function getAction(input: {
  quest: string;
  action: number;
  user?: string;
}) {
  noStore();

  const quest = await db.query.quests.findFirst({
    where: eq(quests.id, input.quest),
    with: {
      completed: input.user
        ? {
            where: eq(xp.user, input.user),
            limit: 1,
            columns: { id: true },
          }
        : undefined,
    },
  });

  if (!quest) return;

  const action = quest.actions[input.action];
  const actionInputs = quest.actionInputs[input.action] ?? {};

  return actions[action](actionInputs);
}

export const getQuests = cache(
  async (input?: { limit?: number; user?: string }) => {
    return db.query.quests.findMany({
      orderBy: desc(quests.name),
      limit: input?.limit,
      with: {
        community: true,
        completed: input?.user
          ? {
              where: eq(xp.user, input.user),
              limit: 1,
              columns: { id: true },
            }
          : undefined,
        prerequisite: true,
      },
    });
  },
  ["getQuests"],
  { tags: ["getQuests"], revalidate: 60 * 10 }
);

export const getQuest = cache(
  async (input: { id: string; user?: string }) => {
    ////
    return db.query.quests.findFirst({
      where: eq(quests.id, input.id),
      with: {
        completed: input.user
          ? {
              where: eq(xp.user, input.user),
              limit: 1,
            }
          : undefined,
        prerequisite: true,
      },
    });
  },
  ["getQuest"],
  { tags: ["getQuest"], revalidate: 60 * 10 }
);
