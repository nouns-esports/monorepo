import { db, proposals, rounds } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { publicProcedure } from "@/trpc";
import { z } from "zod";

export const getProposal = publicProcedure
  .input(
    z.object({
      id: z.number().int(),
    })
  )
  .query(async ({ input }) => {
    return db.query.proposals.findFirst({
      where: eq(proposals.id, input.id),
    });
  });

export const getProposals = publicProcedure
  .input(
    z.object({
      round: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.proposals.findMany({
      where: and(eq(proposals.round, input.round), eq(proposals.hidden, false)),
      orderBy: asc(proposals.createdAt),
      with: {
        votes: true,
      },
    });
  });

export const createProposal = publicProcedure
  .input(
    z.object({
      title: z.string().min(10).max(100),
      description: z.string().min(500),
      round: z.string().min(1),
      user: z.string().min(1),
      value: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    const round = await db.query.rounds.findFirst({
      where: eq(rounds.id, input.round),
    });

    if (!round) {
      throw new Error("Round not found");
    }

    const now = new Date();
    const roundStart = new Date(round.start);
    const votingStart = new Date(round.votingStart);

    if (now < roundStart) {
      throw new Error("Round has not started yet");
    }

    if (now > votingStart) {
      throw new Error("Proposing has closed");
    }

    const hasProposed = await db.query.proposals.findFirst({
      where: and(
        eq(proposals.round, input.round),
        eq(proposals.user, input.user)
      ),
    });

    if (hasProposed) {
      throw new Error("You have already proposed for this round");
    }

    return db.insert(proposals).values([
      {
        title: input.title,
        description: input.description,
        round: input.round,
        user: input.user,
        value: input.value ?? "0",
        createdAt: new Date(),
      },
    ]);
  });

export const updateProposal = publicProcedure
  .input(
    z.object({
      round: z.string().min(1),
      proposal: z.number().gt(0),
      title: z.string().min(10).max(100),
      description: z.string().min(500),
    })
  )
  .query(async ({ input }) => {
    const round = await db.query.rounds.findFirst({
      where: eq(rounds.id, input.round),
    });

    if (!round) {
      throw new Error("Round not found");
    }

    const now = new Date();
    const votingStart = new Date(round.votingStart);

    if (now > votingStart) {
      throw new Error("Proposing has closed");
    }

    return db
      .update(proposals)
      .set({
        title: input.title,
        description: input.description,
      })
      .where(eq(proposals.id, input.proposal));
  });

export const seetProposals = publicProcedure.query(async () => {
  return db.insert(proposals).values([
    {
      title: "Test Propoasl",
      description: "This is a proposal",
      round: "goml-2024",
      user: "sam",
      value: "0",
      createdAt: new Date(),
    },
  ]);
});
