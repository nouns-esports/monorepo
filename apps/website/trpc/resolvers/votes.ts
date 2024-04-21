import { db, votes, proposals, rounds, Round } from "@/db/schema";
import { publicProcedure } from "@/trpc";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

export const castVotes = publicProcedure
  .input(
    z.object({
      user: z.string().min(1),
      round: z.string().min(1),
      votes: z.array(
        z.object({
          proposal: z.number().gt(0),
          count: z.number().gt(0),
        })
      ),
    })
  )
  .query(async ({ input }) => {
    const [round, previousVotes] = await Promise.all([
      db.query.rounds.findFirst({
        where: eq(rounds.id, input.round),
      }),
      db.query.votes.findMany({
        where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
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

    let votesUsed = previousVotes.reduce(
      (votes, vote) => votes + vote.count,
      0
    );

    return db.transaction(async (tx) => {
      for (const vote of input.votes) {
        const proposal = await tx.query.proposals.findFirst({
          where: eq(proposals.id, vote.proposal),
        });

        if (!proposal) {
          tx.rollback();
          throw new Error("Proposal not found");
        }

        if (proposal.round !== input.round) {
          tx.rollback();
          throw new Error("You can only vote on proposals in the same round");
        }

        if (votesUsed + vote.count > 10) {
          tx.rollback();
          throw new Error("You have exceeded the vote limit");
        }

        votesUsed += vote.count;

        return tx.insert(votes).values([
          {
            user: input.user,
            proposal: vote.proposal,
            round: round.id,
            count: vote.count,
            timestamp: now,
          },
        ]);
      }
    });
  });
