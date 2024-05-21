"use server";

import { db, proposals, rounds } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { onlyUserAction } from "@/server/actions";
import { z } from "zod";
import { revalidateTag } from "next/cache";

export const createProposal = onlyUserAction(
  z.object({
    title: z.string().min(10).max(100),
    content: z.string().min(500),
    round: z.string().min(1),
    user: z.string().min(1),
    value: z.string().optional(),
  }),
  async (input) => {
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

    const { image, description } = parseLexicalState(input.content);

    await db.insert(proposals).values([
      {
        title: input.title,
        content: input.content,
        description,
        image,
        round: input.round,
        user: input.user,
        value: input.value ?? "0",
        createdAt: new Date(),
      },
    ]);

    revalidateTag("proposals");
  }
);
