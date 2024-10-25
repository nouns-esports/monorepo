import { db, proposals, votes } from "~/packages/db/schema";
import type { AuthenticatedUser } from "../queries/users";
import { desc, eq } from "drizzle-orm";
import { roundState } from "@/utils/roundState";

export default async function castVoteWinningProposal(user: AuthenticatedUser) {
  const votesCast = await db.query.votes.findMany({
    where: eq(votes.user, user.id),
    with: {
      proposal: {
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
      },
    },
  });

  for (const voteCast of votesCast) {
    const proposal = voteCast.proposal;
    const round = proposal.round;

    const state = roundState(proposal.round);

    if (state !== "Ended") continue;
    if (!proposal) continue;
    if (!round) continue;

    for (let i = 0; i < round.awards.length; i++) {
      const winningProposal = round.proposals[i];

      if (winningProposal?.id === proposal.id) {
        return true;
      }
    }
  }

  return false;
}
