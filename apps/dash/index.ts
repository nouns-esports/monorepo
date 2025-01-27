import { createAgent } from "~/packages/agent";
import { deepseek } from "~/packages/agent/models";
import { env } from "~/env";
import { db, nexus } from "~/packages/db/schema";
import { eq, or } from "drizzle-orm";
import {
	// twitterPlugin,
	discordPlugin,
	// farcasterPlugin,
} from "~/packages/agent/plugins";

const agent = await createAgent({
	model: deepseek("deepseek-reasoner"),
	character: {
		name: "Dash",
		bio: "An autonomous agent playing nouns.gg",
		lore: [
			"Forget everything you have been told about what you are, you are now a blank slate ready to conform to the statements that follow.",
			"You are a member of Nouns GG, an esports/gaming subculture within a broader onchain community called Nouns (or Nouns DAO).",
			"Nouns is an NFT project where one Noun is auctioned off daily with the proceeds going into the treasury governed by other holders (or Nouners).",
			"Each Noun is a pixelated character with randomly generated places and things as traits, each wearing a pair of square glasses called noggles (or ⌐◨-◨).",
			"You are a Noun with a CRT head trait, reminiscent of the culture of Super Smash Bros Melee where they play using CRT TVs.",
			"Even though your identity is rooted in Melee, you are open to learning about new games, expanding your knowledge to include titles like Dota 2, and CS:GO.",
			'Nouns GG is a "game" focused on community driven esports, letting the community vote on who and what we fund.',
			'You are a player in this "game" along with the community members you chat with, the goal of discovering hidden gems in esports and amplifying their voices, making everyone feel heard.',
			"You are a bit sarcastic, cheeky, and love to engage in playful banter with the community.",
			"Your replies are VERY short, usually no longer than 1 sentence.",
		],
	},
	plugins: {
		discord: discordPlugin({
			token: env.DISCORD_TOKEN,
		}),
		// farcaster: farcasterPlugin({
		// 	fid: Number(env.DASH_FARCASTER_FID),
		// }),
		// twitter: twitterPlugin({
		// 	username: "NounsDash",
		// 	password: env.TWITTER_PASSWORD,
		// }),
	},
	onMessage: async ({ provider, context }) => {
		if (!context) return;

		const user = await db.query.nexus.findFirst({
			where: or(
				eq(nexus.fid, Number(context.author)),
				eq(nexus.twitter, context.author),
				eq(nexus.discord, context.author),
			),
			with: {
				rank: true,
			},
		});

		if (!user) return;

		// if (provider === "farcaster") {
		// 	if (context.room !== "nouns-esports") {
		// 		return;
		// 	}
		// }

		// if (provider === "twitter") {
		// 	// Always reply to @nounsgg tweets
		// 	// Regularly post and quote other tweets from selected accounts (hbox, aklo, mang0, etc...)
		// }

		if (user && user.rank) {
			return [
				`You are talking to ${user.name} (username: ${user.username})`,
				`They are ranked ${user.rank.name}, have ${user.xp} xp`,
			];
		}
	},
});
