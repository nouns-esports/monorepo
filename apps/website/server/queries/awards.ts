"use server";

import { awards, db, proposals, rounds } from "~/packages/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

export const getAwards = cache(
  async (input: { round: string }) => {
    return db.query.awards.findMany({
      where: eq(awards.round, input.round),
      orderBy: asc(awards.place),
      with: {
        asset: true,
      },
    });
  },
  ["awards"],
  { tags: ["awards"], revalidate: 60 * 10 }
);

export async function canClaimAward(input: { user: string; round: string }) {
  noStore();

  const [allAwards, round, proposalVotes] = await Promise.all([
    db.query.awards.findMany({
      where: eq(awards.round, input.round),
      orderBy: asc(awards.place),
      columns: {
        claimed: true,
      },
    }),
    db.query.rounds.findFirst({
      columns: {
        end: true,
      },
      where: eq(rounds.id, input.round),
    }),
    await db.query.proposals.findMany({
      where: eq(proposals.round, input.round),
      columns: {
        user: true,
        totalVotes: true,
      },
      orderBy: desc(proposals.totalVotes),
    }),
  ]);

  if (!round) {
    return false;
  }

  if (new Date() < new Date(round.end ?? 0)) {
    return false;
  }

  for (let i = 0; i < proposalVotes.length; i++) {
    const award = allAwards[i];

    if (!award) {
      break;
    }

    if (proposalVotes[i].user === input.user && !award.claimed) {
      return true;
    }
  }

  return false;
}
