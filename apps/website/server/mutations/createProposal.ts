"use server";

import { db, proposals, rounds } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { parseLexicalState } from "@/utils/parseLexicalState";
import checkDiscordAccountAge from "@/utils/checkDiscordAccountAge";
import { onlyUser } from ".";
import { z } from "zod";

export const createProposal = onlyUser
  .schema(
    z.object({
      title: z.string(),
      content: z.string(),
      round: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    if (
      ctx.user.discord?.subject &&
      !checkDiscordAccountAge(ctx.user.discord.subject)
    ) {
      throw new Error(`Error creating proposal`);
    }

    const round = await db.query.rounds.findFirst({
      where: eq(rounds.id, parsedInput.round),
      with: {
        proposals: {
          where: eq(proposals.user, ctx.user.id),
        },
        minProposerRank: true,
      },
    });

    if (!round) {
      throw new Error("Round not found");
    }

    if (round.proposals[0].user === ctx.user.id) {
      throw new Error("You have already proposed for this round");
    }

    if (ctx.user.nexus.rank.place < round.minProposerRank.place) {
      throw new Error("You are not eligible to vote in this round");
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

    const { image, description } = parseLexicalState(parsedInput.content);

    await db.insert(proposals).values([
      {
        title: parsedInput.title,
        content: parsedInput.content,
        description,
        image,
        round: parsedInput.round,
        user: ctx.user.id,
        createdAt: new Date(),
      },
    ]);

    revalidatePath(`/rounds/${parsedInput.round}`);
  });
