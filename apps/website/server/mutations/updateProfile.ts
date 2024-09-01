"use server";

import { z } from "zod";
import { onlyUser } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, ranks, seasons } from "~/packages/db/schema";
import { asc, desc, eq, lte } from "drizzle-orm";
import { getAuthenticatedPrivyUserWithData } from "../queries/users";

export const updateProfile = onlyUser
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
      .where(eq(nexus.id, ctx.user.id));

    revalidatePath(`/users/${ctx.user.handle}`);
    revalidatePath("/nexus");
  });
