"use server";

import { z } from "zod";
import { onlyUser } from ".";
import { db, nexus, quests, seasons, xp } from "~/packages/db/schema";
import { desc, eq, gt } from "drizzle-orm";
import { getAction } from "../queries/quests";
import { revalidatePath } from "next/cache";

export const completeQuest = onlyUser
  .schema(
    z.object({
      quest: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
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

    if (quest.completed.length > 0) {
      throw new Error("Quest already completed");
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
      where: gt(seasons.start, new Date()),
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
        timestamp: new Date(),
        season: currentSeason.id.toString(),
      });
      await tx.update(nexus).set({
        xp: ctx.user.xp + quest.xp,
      });
    });

    revalidatePath(`/quests/${quest.id}`);
    revalidatePath("/nexus");
  });
