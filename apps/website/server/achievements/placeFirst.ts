import { and, asc, desc, eq } from "drizzle-orm";
import { awards, db, proposals } from "~/packages/db/schema";
import type { AuthenticatedUser } from "../queries/users";
import { roundState } from "@/utils/roundState";

export default async function placeFirst(user: AuthenticatedUser) {
  const proposalsCreated = await db.query.proposals.findMany({
    where: and(eq(proposals.user, user.id)),
    with: {
      round: {
        with: {
          proposals: {
            orderBy: desc(proposals.totalVotes),
          },
        },
      },
    },
  });

  for (const proposal of proposalsCreated) {
    const state = roundState(proposal.round);

    if (state !== "Ended") continue;
    if (proposal.round.proposals.length < 1) continue;

    if (proposal.id === proposal.round.proposals[0].id) {
      return true;
    }
  }

  return false;
}
