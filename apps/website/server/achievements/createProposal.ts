import { db, proposals } from "~/packages/db/schema";
import type { AuthenticatedUser } from "../queries/users";
import { eq } from "drizzle-orm";

export default async function createProposal(user: AuthenticatedUser) {
  const proposal = await db.query.proposals.findFirst({
    where: eq(proposals.user, user.id),
  });

  if (proposal) return true;

  return false;
}
