import { db, quests, type Nexus } from "~/packages/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

import linkFarcaster from "@/server/quests/profile/linkFarcaster";
import { getNexus } from "./nexus";

const actions: Record<string, (user: Nexus) => Promise<boolean>> = {
  linkFarcaster,
};

export async function checkAction(input: {
  quest: string;
  action: string;
  user: string;
}) {
  noStore();

  const user = await getNexus({ user: input.user });

  if (!user) return false;

  // Check if the user has already completed the action within the scopes of the quest

  return actions[input.action](user);
}

export const getQuests = cache(
  async (input?: { limit?: number }) => {
    ////
    return db.query.quests.findMany({
      orderBy: desc(quests.name),
      limit: input?.limit,
      with: {
        community: true,
      },
    });
  },
  ["getQuests"],
  { tags: ["getQuests"], revalidate: 60 * 10 }
);

export const getQuest = cache(
  async (input: { id: string }) => {
    return db.query.quests.findFirst({
      where: eq(quests.id, input.id),
    });
  },
  ["getQuest"],
  { tags: ["getQuest"], revalidate: 60 * 10 }
);
