"use server";

import { z } from "zod";
import { onlyRanked } from ".";
import { db, nexus, seasons, snapshots, xp } from "~/packages/db/schema";
import { and, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const booths = {
	checkin: {
		tag: "check-in",
		xp: 250,
		name: "Check in to the event",
	},
	gamersoutreach: {
		tag: "gamers-outreach",
		xp: 300,
		name: "Visit the Gamers Outreach booth",
	},
	nounsgg: {
		tag: "nouns-gg",
		xp: 250,
		name: "Visit the Nouns GG booth",
	},
	playafriendly: {
		tag: "play-a-friendly",
		xp: 100,
		name: "Play a friendly",
	},
	homeruncontest: {
		tag: "homerun-contest",
		xp: 150,
		name: "Score 1000ft+ on Home Run Contest",
	},
	breakthetargets: {
		tag: "break-the-targets",
		xp: 150,
		name: "Break the setup record on Break the Targets",
	},
};

export const claimCheckin = onlyRanked
	.schema(
		z.object({
			event: z.string(),
			booth: z.enum([
				"checkin",
				"gamersoutreach",
				"nounsgg",
				"playafriendly",
				"homeruncontest",
				"breakthetargets",
			]),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const now = new Date();
		const booth = booths[parsedInput.booth];

		const completed = await db.query.snapshots.findFirst({
			where: and(
				eq(snapshots.type, "check-in"),
				eq(snapshots.user, ctx.user.id),
				eq(snapshots.tag, `${parsedInput.event}:${booth.tag}`),
			),
		});

		if (!completed) {
			throw new Error("Checkin not completed");
		}

		const [claimed, currentSeason] = await Promise.all([
			db.query.xp.findFirst({
				where: and(eq(xp.user, ctx.user.id), eq(xp.snapshot, completed.id)),
			}),
			db.query.seasons.findFirst({
				where: and(lte(seasons.start, now), gte(seasons.end, now)),
				orderBy: desc(seasons.start),
			}),
		]);

		if (claimed) {
			throw new Error("Checkin already claimed");
		}

		if (!currentSeason) {
			throw new Error("Season not found");
		}

		await db.transaction(async (tx) => {
			await tx.insert(xp).values({
				user: ctx.user.id,
				amount: booth.xp,
				timestamp: now,
				season: currentSeason.id,
				snapshot: completed.id,
			});

			await tx
				.update(nexus)
				.set({
					xp: (ctx.user.nexus?.xp ?? 0) + booth.xp,
				})
				.where(eq(nexus.id, ctx.user.id));
		});

		revalidatePath("/nexus");

		return booth.xp + (ctx.user.nexus?.xp ?? 0);
	});
