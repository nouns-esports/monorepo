import { Client as DiscordClient } from "discord.js";
import { env } from "~/env";

export const discordClient = new DiscordClient({
	intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

// client.on("ready", () => {
// 	console.log("Discord client is ready");
// });

discordClient.login(env.DASH_DISCORD_TOKEN);
