"use server";

import { db, votes, proposals, rounds } from "@/db/schema";
import { onlyPassMemberAction } from "@/server/actions";
import { z } from "zod";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const castVotes = onlyPassMemberAction(
  z.object({
    user: z.string().min(1),
    round: z.string().min(1),
    votes: z.array(
      z.object({
        proposal: z.number().gt(0),
        count: z.number().gt(0),
      })
    ),
  }),
  async (input, ctx) => {
    // if (ctx.userClaim.userId !== input.user) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "You are not authorized to vote for this user",
    //   });
    // }

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

    // const latestVote = await db.query.votes.findFirst({
    //   orderBy: desc(votes.id),
    // });

    // let id = latestVote ? latestVote.id : 0;

    // console.log(latestVote, id);

    // let id =
    //   (await db.execute(sql.raw(`SELECT MAX(id) FROM votes`))).rowCount ?? 0;

    await db.transaction(async (tx) => {
      for (const vote of input.votes) {
        // id += 1;

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
          throw new Error("You have used all your votes");
        }

        votesUsed += vote.count;

        await tx.insert(votes).values([
          {
            // id: votes.id.default,
            user: input.user,
            proposal: vote.proposal,
            round: round.id,
            count: vote.count,
            timestamp: now,
          },
        ]);
      }
    });

    revalidateTag("proposals");
  }
);
