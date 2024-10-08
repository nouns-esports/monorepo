import { env } from "~/env";
import createAction from "../createAction";

export const joinServer = createAction(async () => {
  return {
    description: <p>Join the Discord server</p>,
    url: "/discord",
    check: async (user) => {
      if (!user.discord) return false;

      const response = await fetch(
        `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${user.discord.subject}`,
        {
          headers: {
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
          },
        }
      );

      if (!response.ok) return false;

      return true;
    },
  };
});
