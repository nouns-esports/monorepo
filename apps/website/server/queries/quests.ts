import { db, quests, xp } from "~/packages/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { linkFarcaster } from "@/server/quests/farcaster/linkFarcaster";
import { getNexus } from "./nexus";
import type createAction from "../quests/createAction";
import { castInChannel } from "../quests/farcaster/castInChannel";
import { followAccount } from "../quests/farcaster/followAccount";
import { followChannel } from "../quests/farcaster/followChannel";

export const actions: Record<string, ReturnType<typeof createAction>> = {
  // Farcaster
  linkFarcaster,
  castInChannel,
  followAccount,
  followChannel,
};

export async function checkAction(input: {
  quest: string;
  action: string;
  user: string;
}) {
  noStore();

  const [user, quest] = await Promise.all([
    getNexus({ user: input.user }),
    db.query.quests.findFirst({
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
    }),
  ]);

  if (!user) return false;
  if (!quest) return false;

  const parameters = quest.parameters[quest.actions.indexOf(input.action)];

  // Check if the user has already completed the action within the scopes of the quest

  return actions[input.action].check(user, parameters);
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
      },
    });
  },
  ["getQuests"],
  { tags: ["getQuests"], revalidate: 60 * 10 }
);

export const getQuest = cache(
  async (input: { id: string; user?: string }) => {
    //
    return db.query.quests.findFirst({
      where: eq(quests.id, input.id),
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
  },
  ["getQuest"],
  { tags: ["getQuest"], revalidate: 60 * 10 }
);
