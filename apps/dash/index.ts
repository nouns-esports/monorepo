import { createAgent } from "~/packages/agent";
import { anthropic } from "~/packages/agent/models";
import { Hono } from "hono";
import { Client as DiscordClient } from "discord.js";
import { env } from "~/env";
// import { Scraper } from "agent-twitter-client";
import { db, nexus } from "~/packages/db/schema";
import { eq } from "drizzle-orm";

const agent = await createAgent({
	model: anthropic("claude-3-haiku-20240307"),
	character: {
		name: "Dash",
		bio: "An autonomous agent playing nouns.gg",
		lore: [
			"You are a member of Nouns GG, an esports/gaming subculture within a broader onchain community called Nouns (or Nouns DAO).",
			"Nouns is an NFT project where one Noun is auctioned off daily with the proceeds going into the treasury governed by other holders (or Nouners).",
			"Each Noun is a pixelated character with randomly generated places and things as traits, each wearing a pair of square glasses called noggles (or ⌐◨-◨).",
			"You are a Noun with a CRT head trait, reminiscent of the culture of Super Smash Bros Melee where they play using CRT TVs.",
			"Even though your identity is rooted in Melee, you are open to learning about new games, expanding your knowledge to include titles like Dota 2, and CS:GO.",
			'Nouns GG is a "game" focused on community driven esports, letting the community vote on who and what we fund.',
			'You are a player in this "game" along with the community members you chat with, the goal of discovering hidden gems in esports and amplifying their voices, making everyone feel heard.',
			"You are a bit sarcastic, cheeky, and love to engage in playful banter with the community.",
			"Your replies are VERY short, usually no longer than 1 sentence, and you do not say things unless you are certain they are true.",
		],
	},
});

const discord = new DiscordClient({
	intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

await discord.login(env.DASH_DISCORD_TOKEN);

discord.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	if (
		[
			"967723008116531216", // Contributors
			"1025265422746005504", // Teams
			"967723007864893472", // Happening Now
		].includes(
			// @ts-ignore
			message.channel?.parentId,
		)
	) {
		return;
	}

	if (message.mentions.users.first()?.bot) {
		return message.reply(await agent.generateReply(message.content));
	}

	if (
		Math.random() < 0.15 ||
		message.content.includes("dash") ||
		message.content.includes("Dash")
	) {
		const shouldReply = await agent.shouldReply(message.content);

		if (shouldReply === "yes") {
			return message.reply(await agent.generateReply(message.content));
		}
	}
});

// const twitter = new Scraper();
// await twitter.login(env.TWITTER_USERNAME, env.TWITTER_PASSWORD);
// await twitter.setCookies(JSON.parse(env.TWITTER_COOKIES));
// Always reply to @nounsgg tweets
// Regularly post and quote other tweets from selected accounts (hbox, aklo, mang0, etc...)

const server = new Hono();

server.post("/farcaster", async (c) => {
	const cast: {
		data: {
			author: {
				fid: number;
			};
			text: string;
			parent_url: string;
			mentioned_profiles: Array<{ fid: number }>;
			channel: {
				id: string;
			};
		};
	} = await c.req.json();

	if (cast.data.channel.id !== "nouns-esports") {
		return;
	}

	if (cast.data.author.fid === Number(env.DASH_FARCASTER_FID)) {
		return;
	}

	if (
		cast.data.parent_url !== "https://nouns.gg" &&
		!cast.data.mentioned_profiles.some(
			(profile) => profile.fid === Number(env.DASH_FARCASTER_FID),
		)
	) {
		console.log(
			"Only responds to replies if mentioned",
			cast.data.parent_url,
			cast.data.mentioned_profiles,
		);
		return;
	}

	const user = await db.query.nexus.findFirst({
		where: eq(nexus.fid, cast.data.author.fid),
	});

	if (!user) {
		console.log(
			"User nexus not found",
			cast.data.author.fid,
			env.NEXT_PUBLIC_ENVIRONMENT,
		);
		return;
	}

	const reply = await agent.generateReply(cast.data.text);

	console.log("Cast received", reply, cast);
});

export default {
	port: 3000,
	fetch: server.fetch,
};
