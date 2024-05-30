"use server";

import { db, votes, proposals, rounds } from "@/db/schema";
import { getAuthenticatedUser } from "@/server/queries/users";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { getNexus } from "../queries/nexus";

export async function castVotes(input: {
  user: string;
  round: string;
  votes: { proposal: number; count: number }[];
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("No user session found");
  }

  if (user !== input.user) {
    throw new Error("You can only cast votes for yourself");
  }

  const nexus = await getNexus({ user });

  if (!nexus) {
    throw new Error("A Nexus membership is required to perform this action");
  }

  const [round, previousVotes] = await Promise.all([
    db.query.rounds.findFirst({
      where: eq(rounds.id, input.round),
    }),
    db.query.votes.findMany({
      where: and(eq(votes.user, user), eq(votes.round, input.round)),
    }),
  ]);

  if (!round) {
    throw new Error("Round not found");
  }

  const now = new Date();
  const votingStart = new Date(round.votingStart);
  const roundEnd = new Date(round.end ?? Infinity);

  if (now < votingStart) {
    throw new Error("Voting has not started yet");
  }

  if (now > roundEnd) {
    throw new Error("Round has ended");
  }

  let votesUsed = previousVotes.reduce((votes, vote) => votes + vote.count, 0);

  await db.transaction(async (tx) => {
    for (const vote of input.votes) {
      const proposal = await tx.query.proposals.findFirst({
        where: eq(proposals.id, vote.proposal),
      });

      if (!proposal) {
        tx.rollback();
        throw new Error("Proposal not found");
      }

      if (proposal.user === user) {
        tx.rollback();
        throw new Error("You cannot vote on your own proposal");
      }

      if (proposal.round !== input.round) {
        tx.rollback();
        throw new Error("You can only vote on proposals in the same round");
      }

      if (votesUsed + vote.count > nexus.votes) {
        tx.rollback();
        throw new Error("You have used all your votes");
      }

      votesUsed += vote.count;

      await tx.insert(votes).values([
        {
          user,
          proposal: vote.proposal,
          round: round.id,
          count: vote.count,
          timestamp: now,
        },
      ]);

      await tx
        .update(proposals)
        .set({
          totalVotes: proposal.totalVotes + vote.count,
        })
        .where(eq(proposals.id, vote.proposal));
    }
  });

  revalidatePath(`/rounds/${input.round}`);
  revalidateTag("votes");
  revalidateTag("proposals");
}
