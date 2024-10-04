"use server";

import { z } from "zod";
import { onlyUser } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, ranks, seasons } from "~/packages/db/schema";
import { asc, desc, eq, lte, or } from "drizzle-orm";

export const updateNexus = onlyUser
  .schema(
    z.object({
      name: z.string(),
      image: z.string().optional(),
      bio: z.string().optional(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    await db
      .update(nexus)
      .set({
        name: parsedInput.name,
        image: parsedInput.image,
        bio: parsedInput.bio,
      })
      .where(
        or(
          ctx.user.nexus?.discord
            ? eq(nexus.discord, ctx.user.nexus.discord)
            : undefined,
          eq(nexus.id, ctx.user.id)
        )
      );

    revalidatePath(`/users/${ctx.user.nexus?.discord ?? ctx.user.id}`);
    revalidatePath("/nexus");
  });
