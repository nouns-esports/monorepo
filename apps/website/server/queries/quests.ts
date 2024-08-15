import { db } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

import linkFarcaster from "@/server/quests/profile/linkFarcaster";
import type { User } from "@privy-io/server-auth";
import { getUser } from "./users";

const actions: Record<string, (user: User) => Promise<boolean>> = {
  linkFarcaster,
};

export async function checkAction(input: {
  quest: string;
  action: string;
  user: string;
}) {
  noStore();

  const user = await getUser({ id: input.user });

  if (!user) return false;

  // Check if the user has already completed the action within the scopes of the quest

  return actions[input.action](user);
}
