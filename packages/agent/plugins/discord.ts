import { Client as DiscordClient } from "discord.js";
import { createPlugin } from "../core/createPlugin";

export const discord = createPlugin(() => {
	return (config: { token: string }) => {
		const client = new DiscordClient({
			intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
		});

		client.on("ready", () => {
			console.log("Discord client is ready");
		});

		client.on("messageCreate", (message) => {
			if (message.author.bot) return;

			if (message.mentions.users.first()?.bot) {
				message.reply(
					`Hello, ${message.author}! You mentioned me? How can I assist you?`,
				);
			}
		});

		client.login(config.token);
	};
});
