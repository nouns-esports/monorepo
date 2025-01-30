"use server";

import { z } from "zod";
import { actionClient, onlyUser } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, rankings, ranks } from "~/packages/db/schema";
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
				const lowestRank = await db.query.ranks.findFirst({
					orderBy: asc(ranks.place),
				});

				if (!lowestRank) {
					throw new Error("No ranks found");
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
				twitter: ctx.user.twitter?.username,
				discord: ctx.user.discord?.username.split("#")[0],
				username: ctx.user.farcaster?.username ?? undefined,
				fid: ctx.user.farcaster?.fid ?? undefined,
				canRecieveEmails: parsedInput.canReceiveEmails ?? false,
			});
		});

		revalidatePath("/nexus");
	});
