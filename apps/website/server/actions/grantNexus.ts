"use server";

import { db, nexus } from "~/packages/db/schema";
import { getAuthenticatedUser } from "../queries/users";
import { isInServer } from "../queries/discord";
import { revalidatePath } from "next/cache";

export async function grantNexus(input: { user: string }) {
  const user = await getAuthenticatedUser(true);

  if (!user) {
    throw new Error("No user session found");
  }

  if (user.id !== input.user) {
    throw new Error("You can only grant nexus for yourself");
  }

  if (!user.discord) {
    throw new Error("You must connect your Discord account to enter the Nexus");
  }
  const inServer = await isInServer({ user: user.discord.subject });

  if (!inServer) {
    throw new Error("You must be in the server to receive enter the Nexus");
  }

  await db.insert(nexus).values({ user: input.user, tier: "Explorer" });

  revalidatePath("/nexus");
}
