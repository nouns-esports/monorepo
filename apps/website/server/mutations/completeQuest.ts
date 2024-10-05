"use server";

import { z } from "zod";
import { onlyRanked } from ".";
import { db, nexus, quests, seasons, xp } from "~/packages/db/schema";
import { and, desc, eq, gt, gte, lt, lte } from "drizzle-orm";
import { getAction } from "../queries/quests";
import { revalidatePath } from "next/cache";

export const completeQuest = onlyRanked
  .schema(
    z.object({
      quest: z.string(),
    })
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
        event: true,
      },
    });

    if (!quest) {
      throw new Error("Quest not found");
    }

    if (quest.completed?.length > 0) {
      throw new Error("Quest already completed");
    }

    if (
      quest.event &&
      (new Date(quest.event.start) > now || new Date(quest.event.end) < now)
    ) {
      throw new Error("Quest event is not active");
    }

    const actions = await Promise.all(
      quest.actions.map(async (action, index) => {
        return getAction({
          quest: quest.id,
          action: index,
          user: ctx.user.id,
        });
      })
    );

    for (const action of actions) {
      if (!action) {
        throw new Error("Action not found");
      }
    }

    const allCompleted = (
      await Promise.all(
        actions.map((action, index) =>
          action?.check(ctx.user, quest.actionInputs[index])
        )
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

    await db.transaction(async (tx) => {
      await tx.insert(xp).values({
        quest: quest.id,
        user: ctx.user.id,
        amount: quest.xp,
        timestamp: now,
        season: currentSeason.id.toString(),
      });

      await tx.update(nexus).set({
        xp: (ctx.user.nexus?.xp ?? 0) + quest.xp,
      });
    });

    revalidatePath(`/quests/${quest.id}`);
    revalidatePath("/nexus");
    revalidatePath("/quests");
  });
