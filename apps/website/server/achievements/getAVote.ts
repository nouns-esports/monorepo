import { db, proposals } from "~/packages/db/schema";
import type { AuthenticatedUser } from "../queries/users";
import { and, eq, gt } from "drizzle-orm";

export default async function getAVote(user: AuthenticatedUser) {
  const proposalWithVote = await db.query.proposals.findFirst({
    where: and(eq(proposals.user, user.id), gt(proposals.totalVotes, 0)),
  });

  if (proposalWithVote) return true;

  return false;
}
