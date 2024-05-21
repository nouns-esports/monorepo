import { Proposal, db, proposals } from "@/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { getUser } from "./users";
import { getRound } from "./rounds";

async function proposalWithUser(proposal: Proposal) {
  const user = await getUser({ id: proposal.user });

  return {
    ...proposal,
    user,
  };
}

export const getProposal = cache(
  async (input: { id?: number; user?: string }) => {
    if (!input.id && !input.user) {
      throw new Error("You must provide either an id or a user");
    }

    if (input.id) {
      const proposal = await db.query.proposals.findFirst({
        where: eq(proposals.id, input.id),
      });

      if (!proposal) return;

      return proposalWithUser(proposal);
    }

    if (input.user) {
      const proposal = await db.query.proposals.findFirst({
        where: eq(proposals.user, input.user),
      });

      if (!proposal) return;

      return proposalWithUser(proposal);
    }
  },
  ["proposals"],
  { tags: ["proposals"] }
);

export const getProposals = cache(
  async (input: { round: string }) => {
    const round = await getRound({ id: input.round });

    if (!round) {
      throw new Error("Round not found");
    }

    const data = await db.query.proposals.findMany({
      where: and(eq(proposals.round, input.round), eq(proposals.hidden, false)),
      orderBy: [desc(proposals.totalVotes), asc(proposals.createdAt)],
    });

    return Promise.all(
      data.map(async (proposal) => proposalWithUser(proposal))
    );
  },
  ["proposals"],
  { tags: ["proposals"] }
);
