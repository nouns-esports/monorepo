import { db, nexus as nexusTable, votes } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserVotes(input: { round: string; user: string }) {
  noStore();

  const previousVotes = await db.query.votes.findMany({
    where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
    columns: { count: true },
  });

  const votesUsed = previousVotes.reduce(
    (votes, vote) => votes + vote.count,
    0
  );

  const nexus = await db.query.nexus.findFirst({
    where: eq(nexusTable.user, input.user),
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
}
