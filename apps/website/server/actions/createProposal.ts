"use server";

import { db, proposals, rounds } from "~/packages/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getAuthenticatedUser } from "../queries/users";
import { parseLexicalState } from "@/utils/parseLexicalState";
import { isInServer } from "../queries/discord";
import { getNexus } from "../queries/nexus";

export async function createProposal(input: {
  title: string;
  content: string;
  round: string;
  user: string;
  value?: string;
}) {
  const user = await getAuthenticatedUser(true);

  if (!user) {
    throw new Error("No user session found");
  }

  if (user.id !== input.user) {
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

  const inServer = user.discord
    ? await isInServer({ user: user.discord.subject })
    : undefined;

  const nexus = inServer ? await getNexus({ user, inServer }) : undefined;

  if (!nexus) {
    throw new Error("A Nexus membership is required to propose");
  }

  const hasProposed = await db.query.proposals.findFirst({
    where: and(eq(proposals.round, input.round), eq(proposals.user, user.id)),
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
      user: user.id,
      value: input.value ?? "0",
      createdAt: new Date(),
    },
  ]);

  revalidateTag("proposals");
}
