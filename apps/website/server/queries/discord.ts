import { env } from "~/env";
import { unstable_noStore as noStore } from "next/cache";

export async function isInServer(input: { user: string }) {
  noStore();

  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${input.user}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  if (response.ok) return true;

  return false;
}
