"use server";

import { z } from "zod";
import { actionClient, onlyUser } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, rankings, ranks, seasons } from "~/packages/db/schema";
import { and, asc, desc, gte, lte } from "drizzle-orm";
import { env } from "~/env";
import checkDiscordAccountAge from "@/utils/checkDiscordAccountAge";

export const createNexus = onlyUser
	.schema(
		z.object({
			name: z.string(),
			image: z.string().optional(),
			bio: z.string().optional(),
			interests: z.array(z.string()).optional(),
			canReceiveEmails: z.boolean().optional(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		if (ctx.user.nexus) {
			throw new Error("User already has a nexus");
		}

		await db.transaction(async (tx) => {
			let rank: number | null = null;

			if (ctx.user.discord) {
				const currentSeason = await db.query.seasons.findFirst({
					orderBy: desc(seasons.start),
					where: lte(seasons.start, new Date()),
					with: {
						ranks: {
							orderBy: asc(ranks.place),
							limit: 1,
						},
						rankings: {
							orderBy: [desc(rankings.timestamp), asc(rankings.xp)],
							limit: 1,
						},
					},
				});

				if (!currentSeason) {
					throw new Error("No active season found");
				}

				const lowestRank = currentSeason.ranks[0];
				const lowestRanking = currentSeason.rankings[0];

				if (!lowestRank) {
					throw new Error("No ranks found");
				}

				if (!lowestRanking) {
					throw new Error("Nobody is ranked");
				}

				const discordResponse = await fetch(
					`https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${ctx.user.discord.subject}`,
					{
						headers: {
							Authorization: `Bot ${env.DISCORD_TOKEN}`,
						},
					},
				);

				if (
					discordResponse.ok &&
					checkDiscordAccountAge(ctx.user.discord.subject)
				) {
					rank = lowestRank.id;
					await tx.insert(rankings).values({
						season: currentSeason.id,
						user: ctx.user.id,
						position: lowestRanking.position + 1,
						diff: 0,
						xp: 0,
						timestamp: lowestRanking.timestamp,
						rank: lowestRank.id,
					});
				}
			}

			await tx.insert(nexus).values({
				id: ctx.user.id,
				rank,
				name: parsedInput.name,
				image:
					parsedInput.image ??
					`https://api.cloudnouns.com/v1/pfp?text=${ctx.user.id}&background=1`,
				bio: parsedInput.bio,
				interests: parsedInput.interests,
				wallet: ctx.user.smartWallet,
				twitter: ctx.user.twitter?.username,
				discord: ctx.user.discord?.username.split("#")[0],
				username: ctx.user.farcaster?.username ?? undefined,
				fid: ctx.user.farcaster?.fid ?? undefined,
				canRecieveEmails: parsedInput.canReceiveEmails ?? false,
			});
		});

		revalidatePath("/nexus");
	});
