"use server";

import { db, proposals, rounds } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getAuthenticatedUser } from "../queries/users";

export async function createProposal(input: {
  title: string;
  content: string;
  round: string;
  user: string;
  value?: string;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("No user session found");
  }

  if (user !== input.user) {
    throw new Error("You can only create a proposal for yourself");
  }

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
    where: and(eq(proposals.round, input.round), eq(proposals.user, user)),
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
      user,
      value: input.value ?? "0",
      createdAt: new Date(),
    },
  ]);

  revalidateTag("proposals");
}
