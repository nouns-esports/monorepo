import { db, proposals } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getProposal = cache(
  async (input: { id: number }) => {
    return db.query.proposals.findFirst({
      where: eq(proposals.id, input.id),
    });
  },
  ["proposal"],
  { tags: ["proposal"], revalidate: 1 }
);

export const getProposals = cache(
  async (input: { round: string }) => {
    return db.query.proposals.findMany({
      where: and(eq(proposals.round, input.round), eq(proposals.hidden, false)),
      orderBy: asc(proposals.createdAt),
      with: {
        votes: true,
      },
    });
  },
  ["proposals"],
  { tags: ["proposals"], revalidate: 1 }
);
