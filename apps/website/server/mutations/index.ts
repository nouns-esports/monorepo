import { createSafeActionClient } from "next-safe-action";
import { getAuthenticatedUser } from "../queries/users";
import { env } from "~/env";
import { db, nexus as nexusTable } from "~/packages/db/schema";
import { eq } from "drizzle-orm";

export const actionClient = createSafeActionClient();

export const onlyUser = actionClient.use(async ({ next }) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("No user session found");
  }

  const nexus = await db.query.nexus.findFirst({
    where: eq(nexusTable.id, user.id),
    with: {
      rank: true,
    },
  });

  if (!nexus) {
    throw new Error("No Nexus profile found");
  }

  return next({
    ctx: {
      user: {
        ...user,
        nexus,
      },
    },
  });
});

export const onlyAdmin = onlyUser.use(async ({ next, ctx }) => {
  const admins = {
    production: [
      // Sam
      "did:privy:clx8g9mui0c1k10947grzks2a",
    ],
    development: [
      // Sam
      "did:privy:clzmy1z8f03ehztrjkfwy9bne",
    ],
  };

  if (!admins[env.NEXT_PUBLIC_ENVIRONMENT].includes(ctx.user.id)) {
    throw new Error("You must be an admin to complete this action");
  }

  return next();
});
