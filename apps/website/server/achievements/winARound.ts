import { roundState } from "@/utils/roundState";
import type { AuthenticatedUser } from "../queries/users";
import { and, eq, desc } from "drizzle-orm";
import { db, proposals } from "~/packages/db/schema";

export default async function winARound(user: AuthenticatedUser) {
  const proposalsCreated = await db.query.proposals.findMany({
    where: and(eq(proposals.user, user.id)),
    with: {
      round: {
        with: {
          awards: true,
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

    for (let i = 0; i < proposal.round.awards.length; i++) {
      const winningProposal = proposal.round.proposals[i];

      if (winningProposal?.id === proposal.id) {
        return true;
      }
    }
  }

  return false;
}
