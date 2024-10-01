"use server";

import { env } from "~/env";
import { onlyUser } from ".";
import { z } from "zod";
import { privyClient } from "../clients/privy";
import { db, nexus } from "~/packages/db/schema";
import { eq } from "drizzle-orm";

export const deleteUser = onlyUser.action(async ({ ctx }) => {
  try {
    await privyClient.deleteUser(ctx.user.id);
    await db.delete(nexus).where(eq(nexus.id, ctx.user.id));

    return true;
  } catch (e) {}

  return false;
});
