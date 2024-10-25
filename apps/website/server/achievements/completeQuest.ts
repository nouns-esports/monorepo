import { db, xp } from "~/packages/db/schema";
import type { AuthenticatedUser } from "../queries/users";
import { and, eq, isNotNull } from "drizzle-orm";

export default async function completeQuest(user: AuthenticatedUser) {
  const completed = await db.query.xp.findFirst({
    where: and(eq(xp.user, user.id), isNotNull(xp.quest)),
  });

  if (completed) return true;
  return false;
}
