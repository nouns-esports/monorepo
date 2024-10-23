"use server";

import { env } from "~/env";
import { onlyRanked, onlyUser } from ".";
import { z } from "zod";
import { db, nexus, xp } from "~/packages/db/schema";
import { and, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkAchievements } from "../queries/achievements";

export const claimAchievement = onlyRanked
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    if (!checkAchievements[parsedInput.id]) {
      throw new Error("Achievement not found");
    }

    const alreadyClaimed = await db.query.xp.findFirst({
      where: and(eq(xp.user, ctx.user.id), eq(xp.achievement, parsedInput.id)),
    });

    if (alreadyClaimed) {
      throw new Error("Achievement already claimed");
    }

    if (!(await checkAchievements[parsedInput.id](ctx.user))) {
      throw new Error("Achievement not completed");
    }

    await db.transaction(async (tx) => {
      await tx.insert(xp).values({
        user: ctx.user.id,
        achievement: parsedInput.id,
        amount: 0,
        season: 1,
        timestamp: new Date(),
      });
      await tx
        .update(nexus)
        .set({
          xp: (ctx.user.nexus?.xp ?? 0) + 0,
        })
        .where(eq(nexus.id, ctx.user.id));
    });

    revalidatePath(`/users/${ctx.user.id}`);
    if (ctx.user.nexus?.discord) {
      revalidatePath(`/users/${ctx.user.nexus.discord}`);
    }
    revalidatePath("/nexus");
  });
