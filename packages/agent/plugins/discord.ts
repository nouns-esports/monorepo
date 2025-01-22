import { Client as DiscordClient } from "discord.js";
import { createPlugin } from "../core/createPlugin";

export function discordPlugin(config: { token: string }) {
	return createPlugin(async ({ log, generateReply }) => {
		const client = new DiscordClient({
			intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
		});

		client.on("messageCreate", async (message) => {
			if (message.author.bot) return;

			if (message.mentions.users.first()?.bot) {
				message.reply(await generateReply(message.content));
			}
		});

		await client.login(config.token);

		await new Promise<void>((resolve) => {
			client.on("ready", () => {
				resolve();
			});
		});

		return {
			client,
		};
	});
}
