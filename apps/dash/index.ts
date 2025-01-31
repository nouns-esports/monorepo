import { createAgent } from "~/packages/agent";
import { anthropic, deepseek } from "~/packages/agent/models";
import { env } from "~/env";
import { db, nexus, xp, seasons, snapshots } from "~/packages/db/schema";
import { and, gte, lte, desc, eq, inArray, or } from "drizzle-orm";
import {
	// twitterPlugin,
	discordPlugin,
	// farcasterPlugin,
} from "~/packages/agent/plugins";

const agent = await createAgent({
	// model: deepseek("deepseek-reasoner"),
	model: anthropic("claude-3-haiku-20240307"),
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
			'You are a player in this "game" along with the community members you chat with.',
			"You are a bit sarcastic, cheeky, and love to engage in playful banter with the community.",
			"Your replies are VERY short, usually no longer than 1 sentence.",
			"Nexus is Nouns GG's ranking system where you rank up by earning xp and being placed in on a leaderboard against other players.",
			"There are 3 ranks and 3 tiers within each rank from lowest to highest in this order: Explorer I, Explorer II, Explorer III, Challenger I, Challenger II, Challenger III, Champion I, Champion II, Champion III",
		],
	},
	plugins: {
		discord: discordPlugin({
			token: env.DASH_DISCORD_TOKEN,
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
				eq(nexus.fid, Number(context.author) || 0),
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

		if (user.rank) {
			return [
				`You are talking to ${user.name}`,
				`They are ranked ${user.rank.name} and have ${user.xp} xp`,
			];
		}
	},
});

agent.addTool({
	name: "awardXP",
	description:
		"Take a snapshot and distribute xp to attendees of a weekly contributor call",
	execute: async (context) => {
		console.log("Tool run", context);
		if (context.author !== "samscolari") {
			return;
		}

		const now = new Date();

		const channel =
			await agent.plugins.discord.client.channels.fetch("967723008116531219");

		if (!channel) {
			return;
		}

		if (!channel.isVoiceBased()) {
			return;
		}

		const [users, currentSeason] = await Promise.all([
			db.query.nexus.findMany({
				where: inArray(
					nexus.discord,
					channel.members.map((guildMember) => guildMember.user.username),
				),
			}),
			db.query.seasons.findFirst({
				where: and(lte(seasons.start, now), gte(seasons.end, now)),
				orderBy: desc(seasons.start),
			}),
		]);

		if (!currentSeason) throw new Error("No season found");

		await db.transaction(async (tx) => {
			console.log("transacting");
			for (const user of users) {
				console.log("user", user.name);
				const [snapshot] = await tx
					.insert(snapshots)
					.values({
						type: "discord-call",
						user: user.id,
						timestamp: now,
					})
					.returning({ id: snapshots.id });

				const amount = 300;

				await tx.insert(xp).values({
					user: user.id,
					amount,
					timestamp: now,
					snapshot: snapshot.id,
					season: currentSeason.id,
				});

				await tx
					.update(nexus)
					.set({
						xp: user.xp + amount,
					})
					.where(eq(nexus.id, user.id));
			}
		});
	},
});
