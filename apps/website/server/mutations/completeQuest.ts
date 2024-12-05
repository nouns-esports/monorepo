"use server";

import { z } from "zod";
import { onlyRanked } from ".";
import { db, nexus, quests, seasons, xp } from "~/packages/db/schema";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { getAction } from "../queries/quests";
import { revalidatePath } from "next/cache";

export const completeQuest = onlyRanked
	.schema(
		z.object({
			quest: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const now = new Date();

		const quest = await db.query.quests.findFirst({
			where: eq(quests.id, parsedInput.quest),
			with: {
				completed: {
					where: eq(xp.user, ctx.user.id),
					limit: 1,
				},
			},
		});

		if (!quest) {
			throw new Error("Quest not found");
		}

		if (quest.completed?.length > 0) {
			throw new Error("Quest already completed");
		}

		if (!quest.active) {
			throw new Error("Quest is not active");
		}

		if (quest.start && new Date(quest.start) > now) {
			throw new Error("Quest hasnt started yet");
		}

		if (quest.end && new Date(quest.end) < now) {
			throw new Error("Quest has closed");
		}

		const actions = await Promise.all(
			quest.actions.map(async (action, index) => {
				return getAction({
					quest: quest.id,
					action: index,
					user: ctx.user.id,
				});
			}),
		);

		for (const action of actions) {
			if (!action) {
				throw new Error("Action not found");
			}
		}

		const allCompleted = (
			await Promise.all(
				actions.map((action, index) =>
					action?.check(ctx.user, quest.actionInputs[index]),
				),
			)
		).every((isComplete) => isComplete);

		if (!allCompleted) {
			throw new Error("Not all actions completed");
		}

		const currentSeason = await db.query.seasons.findFirst({
			where: and(lte(seasons.start, now), gte(seasons.end, now)),
			orderBy: desc(seasons.start),
		});

		if (!currentSeason) {
			throw new Error("Season not found");
		}

		let newXP = 0;

		await db.transaction(async (tx) => {
			await tx.insert(xp).values({
				quest: quest.id,
				user: ctx.user.id,
				amount: quest.xp,
				timestamp: now,
				season: currentSeason.id,
			});

			const updateXP = await tx
				.update(nexus)
				.set({
					xp: sql`${nexus.xp} + ${quest.xp}`,
				})
				.where(eq(nexus.id, ctx.user.id))
				.returning({
					xp: nexus.xp,
				});

			newXP = updateXP[0].xp;
		});

		revalidatePath(`/quests/${quest.id}`);
		revalidatePath("/nexus");
		revalidatePath("/quests");

		return newXP;
	});
