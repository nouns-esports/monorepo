"use server";

import { env } from "@/env";
import { unstable_noStore as noStore } from "next/cache";

export async function isInServer(input: { user: string }) {
  noStore();

  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/search?query=${input.user}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  const members = await response.json();

  for (const member of members) {
    if (member.user.username === input.user) {
      return true;
    }
  }

  return false;
}
