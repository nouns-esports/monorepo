import { db, pass, votes } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getUserVotes = cache(
  async (input: { round: string; user: string }) => {
    const previousVotes = await db.query.votes.findMany({
      where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
    });

    const votesUsed = previousVotes.reduce(
      (votes, vote) => votes + vote.count,
      0
    );

    const nexus = await db.query.pass.findFirst({
      where: eq(pass.user, input.user),
    });

    const allottedVotes = nexus
      ? nexus.tier === 0
        ? 1
        : nexus.tier === 1
          ? 3
          : 10
      : 0;

    return {
      remaining: allottedVotes - votesUsed,
      allocated: allottedVotes,
    };
  },
  ["votes"],
  { tags: ["votes"] }
);
