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

// export async function createProposal(input: {
//   title: string;
//   content: string;
//   round: string;
//   user: string;
//   value?: string;
// }) {
//   const user = await getAuthenticatedUser();

//   if (!user) {
//     throw new Error("No user session found");
//   }

//   if (user.id !== input.user) {
//     throw new Error("You can only create a proposal for yourself");
//   }

//   const nexus = await getNexus({ user: user.id });

//   if (!nexus) {
//     throw new Error("A Nexus membership is required to vote");
//   }

//   if (user.discord?.subject && !checkDiscordAccountAge(user.discord.subject)) {
//     throw new Error(
//       `Privy user ${user.id} and discord account ${user.discord.subject} is less than 30 days old`
//     );
//   }

//   const round = await db.query.rounds.findFirst({
//     where: eq(rounds.id, input.round),
//   });

//   if (!round) {
//     throw new Error("Round not found");
//   }

//   if (round.minProposerRank === "Challenger" && nexus.tier === "Explorer") {
//     throw new Error("You are not eligible to propose in this round");
//   }

//   if (
//     round.minProposerRank === "Champion" &&
//     (nexus.tier === "Challenger" || nexus.tier === "Explorer")
//   ) {
//     throw new Error("You are not eligible to propose in this round");
//   }

//   const now = new Date();
//   const roundStart = new Date(round.start);
//   const votingStart = new Date(round.votingStart);

//   if (now < roundStart) {
//     throw new Error("Round has not started yet");
//   }

//   if (now > votingStart) {
//     throw new Error("Proposing has closed");
//   }

//   const hasProposed = await db.query.proposals.findFirst({
//     where: and(eq(proposals.round, input.round), eq(proposals.user, user.id)),
//   });

//   if (hasProposed) {
//     throw new Error("You have already proposed for this round");
//   }

//   const { image, description } = parseLexicalState(input.content);

//   await db.insert(proposals).values([
//     {
//       title: input.title,
//       content: input.content,
//       description,
//       image,
//       round: input.round,
//       user: user.id,
//       value: input.value ?? "0",
//       createdAt: new Date(),
//     },
//   ]);

//   revalidateTag("proposals");
// }
