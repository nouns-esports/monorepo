import { env } from "~/env";
import type { AuthenticatedUser } from "../queries/users";

export default async function joinServer(user: AuthenticatedUser) {
  console.log("checking joinServer", user.discord);
  if (!user.discord) return false;

  const discordResponse = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${user.discord.subject}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  console.log(
    "discordResponse",
    discordResponse.ok,
    await discordResponse.json()
  );

  if (discordResponse.ok) return true;

  return false;
}
