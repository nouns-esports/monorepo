import { db, proposals } from "~/packages/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getProposal = cache(
  async (input: { id: number } | { user: string; round: string }) => {
    if ("id" in input) {
      return db.query.proposals.findFirst({
        where: eq(proposals.id, input.id),
      });
    }

    if (input.user) {
      return db.query.proposals.findFirst({
        where: and(
          eq(proposals.round, input.round),
          eq(proposals.user, input.user)
        ),
      });
    }

    throw new Error("You must provide either an id or a user");
  },
  ["proposals"],
  { tags: ["proposals"], revalidate: 60 * 10 }
);

export const getProposals = cache(
  async (input: { round: string }) => {
    return db.query.proposals.findMany({
      where: and(eq(proposals.round, input.round), eq(proposals.hidden, false)),
      orderBy: [desc(proposals.totalVotes), asc(proposals.createdAt)],
    });
  },
  ["proposals"],
  { tags: ["proposals"], revalidate: 60 * 10 }
);
