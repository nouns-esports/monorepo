import { db, rounds, votes } from "~/packages/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export async function getPriorVotes(input: { round: string; user: string }) {
  noStore();

  const previousVotes = await db.query.votes.findMany({
    where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
    columns: { count: true },
  });

  return previousVotes.reduce((votes, vote) => votes + vote.count, 0);
}

export async function getVotes(input: { round: string; user: string }) {
  return db.query.votes.findMany({
    where: and(eq(votes.user, input.user), eq(votes.round, input.round)),
  });
}

export async function getUserVotesForRound(input: {
  round: string;
  user: string;
}) {
  const round = await db.query.rounds.findFirst({
    where: eq(rounds.id, input.round),
    with: {
      votes: {
        where: eq(votes.user, input.user),
        orderBy: desc(votes.count),
        with: {
          proposal: {
            columns: {
              title: true,
            },
          },
        },
        columns: {
          count: true,
        },
      },
    },
    columns: {
      id: true,
      start: true,
      end: true,
      votingStart: true,
      image: true,
    },
  });

  if (!round) {
    return;
  }

  if (round.votes.length < 1) {
    return;
  }

  const condensedVotes = round.votes.reduce(
    (acc: Record<string, typeof vote>, vote) => {
      if (!acc[vote.proposal.title]) {
        acc[vote.proposal.title] = { ...vote };
      } else acc[vote.proposal.title].count += vote.count;

      return acc;
    },
    {}
  );

  return {
    ...round,
    votes: Object.values(condensedVotes),
  };
}
