"use server";

import { z } from "zod";
import { actionClient } from ".";
import { db, nexus } from "~/packages/db/schema";
import { eq } from "drizzle-orm";

export const validateUsername = actionClient
  .schema(
    z.object({
      username: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const user = await db.query.nexus.findFirst({
      where: eq(nexus.handle, parsedInput.username),
    });

    if (user) {
      return false;
    }

    return true;
  });
