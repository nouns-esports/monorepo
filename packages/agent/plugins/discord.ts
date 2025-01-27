import { createPlugin } from "../core/createPlugin";
import { Client } from "discord.js";

export function discordPlugin(options: { token: string }) {
	return createPlugin(async ({ generateReply }) => {
		const client = new Client({
			intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
		});

		await client.login(options.token);

		client.on("messageCreate", async (message) => {
			if (message.author.bot) return;
			if (!client.user) return;

			const mentioned = message.mentions.has(client.user.id);

			if (mentioned) {
				const reply = await generateReply(message.content, {
					id: message.id,
					author: message.author.username,
					room: message.channel.id,
					mentions: message.mentions.users.map((user) => user.username),
					embeds: [],
				});

				await message.reply(reply.text);
			}
		});

		return {
			client,
		};
	});
}
