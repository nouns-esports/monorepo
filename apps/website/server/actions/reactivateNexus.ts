"use server";

import { db, nexus } from "~/packages/db/schema";
import { revalidateTag } from "next/cache";
import { isInServer } from "../queries/discord";
import { getAuthenticatedUser } from "../queries/users";
import { eq } from "drizzle-orm";

export async function reactivateNexus(input: { user: string }) {
  const user = await getAuthenticatedUser(true);

  if (!user) {
    throw new Error("No user session found");
  }

  if (user.id !== input.user) {
    throw new Error("You can only reactivate your own Nexus");
  }

  if (!user.discord?.username) {
    throw new Error("Discord not connected");
  }

  const inDiscord = await isInServer({ user: user.discord.username });

  if (!inDiscord) {
    throw new Error("Not in discord");
  }

  await db
    .update(nexus)
    .set({
      updated: new Date(),
      active: true,
    })
    .where(eq(nexus.user, user.id));

  revalidateTag("nexus");
  revalidateTag("votes");
}
