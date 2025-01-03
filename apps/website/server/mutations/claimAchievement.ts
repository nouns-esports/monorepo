"use server";

import { env } from "~/env";
import { onlyRanked, onlyUser } from ".";
import { z } from "zod";
import {
	db,
	events,
	nexus,
	notifications,
	seasons,
	xp,
	type Notification,
} from "~/packages/db/schema";
import { and, desc, eq, gte, lte, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkAchievements } from "../queries/achievements";
import { achievements } from "../achievements";

export const claimAchievement = onlyRanked
	.schema(
		z.object({
			id: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const achievement = achievements[parsedInput.id];
		const checkAchievement = checkAchievements[parsedInput.id];

		if (!checkAchievement || !achievement) {
			throw new Error("Achievement not found");
		}

		const now = new Date();

		const [alreadyClaimed, currentSeason] = await Promise.all([
			db.query.xp.findFirst({
				where: and(
					eq(xp.user, ctx.user.id),
					eq(xp.achievement, parsedInput.id),
				),
			}),
			db.query.seasons.findFirst({
				where: and(lte(seasons.start, now), gte(seasons.end, now)),
			}),
		]);

		if (!currentSeason) {
			throw new Error("No active season");
		}

		if (alreadyClaimed) {
			throw new Error("Achievement already claimed");
		}

		if (!(await checkAchievement(ctx.user))) {
			throw new Error("Achievement not completed");
		}

		let newXP = 0;
		const notification = {
			user: ctx.user.id,
			title: "You claimed an achievement!",
			description: achievement.description,
			image: achievement.image,
			read: true,
			timestamp: now,
			url: "/nexus",
		};

		await db.transaction(async (tx) => {
			await tx.insert(xp).values({
				user: ctx.user.id,
				achievement: parsedInput.id,
				amount: achievement.xp,
				season: currentSeason.id,
				timestamp: now,
			});

			await tx.insert(notifications).values(notification);

			const updateXP = await tx
				.update(nexus)
				.set({
					xp: sql`${nexus.xp} + ${achievement.xp}`,
				})
				.where(eq(nexus.id, ctx.user.id))
				.returning({
					xp: nexus.xp,
				});

			newXP = updateXP[0].xp;
		});

		revalidatePath(`/users/${ctx.user.id}`);
		if (ctx.user.nexus?.discord) {
			revalidatePath(`/users/${ctx.user.nexus.discord}`);
		}
		revalidatePath("/nexus");

		return { newXP, notification };
	});
