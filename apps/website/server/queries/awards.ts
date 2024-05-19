"use server";

import { awards, db, proposals, rounds, votes } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getAwards = cache(
  async (input: { round: string }) => {
    return db.query.awards.findMany({
      where: eq(awards.round, input.round),
      orderBy: asc(awards.place),
    });
  },
  ["awards"],
  { tags: ["awards"], revalidate: 60 * 10 }
);

export const canClaimAward = cache(
  async (input: { user: string; round: string }) => {
    const proposal = await db.query.proposals.findFirst({
      where: and(
        eq(proposals.round, input.round),
        eq(proposals.user, input.user)
      ),
    });

    if (!proposal) {
      return false;
    }

    const [allAwards, round, allVotes] = await Promise.all([
      db.query.awards.findMany({
        where: eq(awards.round, input.round),
        orderBy: asc(awards.place),
      }),
      db.query.rounds.findFirst({
        where: eq(rounds.id, input.round),
      }),
      db.query.votes.findMany({
        where: eq(votes.round, input.round),
      }),
    ]);

    if (!round) {
      throw new Error("Round not found");
    }

    if (new Date() < new Date(round.end ?? 0)) {
      throw new Error("Round has not ended");
    }

    const proposalsWithVotes: Record<number, { id: number; count: number }> =
      {};

    for (const vote of allVotes) {
      if (proposalsWithVotes[vote.proposal]) {
        proposalsWithVotes[vote.proposal] = {
          id: vote.proposal,
          count: proposalsWithVotes[vote.proposal].count + vote.count,
        };
      } else {
        proposalsWithVotes[vote.proposal] = {
          id: vote.proposal,
          count: vote.count,
        };
      }
    }

    const sortedProposals = Object.values(proposalsWithVotes).sort(
      (a, b) => b.count - a.count
    );

    for (let i = 0; i < sortedProposals.length; i++) {
      const award = allAwards[i];

      if (!award) {
        break;
      }

      if (sortedProposals[i].id === proposal.id && !award.claimed) {
        return true;
      }
    }

    return false;
  },
  ["awards"],
  { tags: ["awards"], revalidate: 1 }
);
