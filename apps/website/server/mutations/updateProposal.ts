"use server";

import { db, proposals, rounds } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { parseLexicalState } from "@/utils/parseLexicalState";
import { z } from "zod";
import { onlyUser } from ".";

export const updateProposal = onlyUser
  .schema(
    z.object({
      title: z.string(),
      content: z.string(),
      round: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const round = await db.query.rounds.findFirst({
      where: eq(rounds.id, parsedInput.round),
      with: {
        proposals: {
          where: eq(proposals.user, ctx.user.id),
        },
      },
    });

    if (!round) {
      throw new Error("Round not found");
    }

    const proposal = round.proposals[0];

    if (!proposal) {
      throw new Error("You did not propose for this round");
    }

    const now = new Date();
    const votingStart = new Date(round.votingStart);

    if (now > votingStart) {
      throw new Error("Proposing has closed");
    }

    const { image, description } = parseLexicalState(parsedInput.content);

    await db
      .update(proposals)
      .set({
        title: parsedInput.title,
        content: parsedInput.content,
        description,
        image,
      })
      .where(eq(proposals.id, proposal.id));

    revalidateTag("proposals");
  });

// export async function updateProposal(input: {
//   user: string;
//   round: string;
//   title: string;
//   content: string;
// }) {
//   const user = await getAuthenticatedUser();

//   if (!user) {
//     throw new Error("No user session found");
//   }

//   if (input.user !== user.id) {
//     throw new Error("You can only update your own proposal");
//   }

//   const [round, proposal] = await Promise.all([
//     await db.query.rounds.findFirst({
//       where: eq(rounds.id, input.round),
//     }),
//     await db.query.proposals.findFirst({
//       where: and(eq(proposals.round, input.round), eq(proposals.user, user.id)),
//     }),
//   ]);

//   if (!round) {
//     throw new Error("Round not found");
//   }

//   if (!proposal) {
//     throw new Error("You did not propose for this round");
//   }

//   const now = new Date();
//   const votingStart = new Date(round.votingStart);

//   if (now > votingStart) {
//     throw new Error("Proposing has closed");
//   }

//   const { image, description } = parseLexicalState(input.content);

//   await db
//     .update(proposals)
//     .set({
//       title: input.title,
//       content: input.content,
//       description,
//       image,
//     })
//     .where(eq(proposals.id, proposal.id));

//   revalidateTag("proposals");
// }
