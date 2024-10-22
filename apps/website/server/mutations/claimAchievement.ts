"use server";

import { env } from "~/env";
import { onlyRanked, onlyUser } from ".";
import { z } from "zod";
import { achievements, type Achievement } from "../queries/achievements";
import { db, nexus, xp } from "~/packages/db/schema";
import { and, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function search(
  node: Achievement,
  achievement: string,
  parent?: Achievement
): { current: Achievement; previous?: Achievement } | void {
  if (node.id === achievement) {
    return { current: node, previous: parent };
  }

  if (node.next) {
    if (Array.isArray(node.next)) {
      for (const nextNode of node.next) {
        return search(nextNode, achievement, node);
      }
    } else return search(node.next, achievement, node);
  }
}

export const claimAchievement = onlyRanked
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const achievement = search(achievements, parsedInput.id, undefined);

    if (!achievement?.current.id) {
      throw new Error("Achievement not found");
    }

    const claimRecords = await db.query.xp.findMany({
      where: and(
        eq(xp.user, ctx.user.id),
        or(
          eq(xp.achievement, achievement.current.id),
          achievement.previous
            ? eq(xp.achievement, achievement.previous.id)
            : undefined
        )
      ),
    });

    const alreadyClaimedCurrent = claimRecords.find(
      (record) => record.achievement === achievement.current.id
    );
    const alreadyClaimedPrevious = achievement.previous
      ? claimRecords.find(
          (record) => record.achievement === achievement.previous?.id
        )
      : undefined;

    if (alreadyClaimedCurrent) {
      throw new Error("Achievement already claimed");
    }

    if (
      !alreadyClaimedPrevious ||
      !(await achievement.previous?.check(ctx.user))
    ) {
      throw new Error("Previous achievement not claimed or completed");
    }

    if (!(await achievement.current.check(ctx.user))) {
      throw new Error("Achievement not completed");
    }

    await db.transaction(async (tx) => {
      await tx.insert(xp).values({
        user: ctx.user.id,
        achievement: achievement.current.id,
        amount: achievement.current.xp,
        season: 1,
        timestamp: new Date(),
      });
      await tx
        .update(nexus)
        .set({
          xp: (ctx.user.nexus?.xp ?? 0) + achievement.current.xp,
        })
        .where(eq(nexus.id, ctx.user.id));
    });

    revalidatePath(`/users/${ctx.user.id}`);
    if (ctx.user.nexus?.discord) {
      revalidatePath(`/users/${ctx.user.nexus.discord}`);
    }
    revalidatePath("/nexus");
  });
