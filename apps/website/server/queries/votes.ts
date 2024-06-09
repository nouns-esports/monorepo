import { db, votes } from "~/packages/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export async function getPriorVotes(input: { round: string; user: string }) {
  noStore();

  const previousVotes = await db.query.votes.findMany({
    where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
    columns: { count: true },
  });

  return previousVotes.reduce((votes, vote) => votes + vote.count, 0);
}
