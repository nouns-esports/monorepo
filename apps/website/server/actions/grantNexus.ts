"use server";

import { db, nexus } from "~/packages/db/schema";
import { getAuthenticatedUser } from "../queries/users";
import { isInServer } from "../queries/discord";
import { revalidatePath } from "next/cache";
import { env } from "~/env";

export async function grantNexus(input: { user: string }) {
  const user = await getAuthenticatedUser();

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
    throw new Error("You must be in the server to enter the Nexus");
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${user.discord.subject}/roles/${env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "1245110318603042950" : "1253532214784819240"}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add role");
  }

  await db.insert(nexus).values({ user: input.user, tier: "Explorer" });

  revalidatePath("/nexus");
}
