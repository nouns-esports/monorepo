"use server";

import { db, pass } from "@/db/schema";
import { revalidateTag } from "next/cache";
import { isInServer } from "../queries/discord";
import { getAuthenticatedUser } from "../queries/users";

export async function grantExplorer(input: { user: string }) {
  const user = await getAuthenticatedUser(true);

  if (!user) {
    throw new Error("No user session found");
  }

  if (user.id !== input.user) {
    throw new Error("You can only grant Nexus to yourself");
  }

  if (!user.discord?.username) {
    throw new Error("Discord not connected");
  }

  const inDiscord = await isInServer({ user: user.discord.username });

  if (!inDiscord) {
    throw new Error("Not in discord");
  }

  await db.insert(pass).values({
    user: user.id,
    tier: 0,
  });

  revalidateTag("nexus");
  revalidateTag("votes");
}
