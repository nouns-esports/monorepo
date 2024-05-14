"use server";

import { db, proposals, rounds } from "@/db/schema";
import { eq } from "drizzle-orm";
import { onlyUserAction } from "@/server/actions";
import { z } from "zod";
import { revalidateTag } from "next/cache";

export const updateProposal = onlyUserAction(
  z.object({
    user: z.string().min(1),
    round: z.string().min(1),
    proposal: z.number().gt(0),
    title: z.string().min(10).max(100),
    description: z.string().min(500),
  }),
  async (input) => {
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

    await db
      .update(proposals)
      .set({
        title: input.title,
        description: input.description,
      })
      .where(eq(proposals.id, input.proposal));

    revalidateTag("proposals");
  }
);
