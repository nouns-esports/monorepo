import { awards, db, proposals, rounds, votes } from "~/packages/db/schema";
import {
  eq,
  gt,
  and,
  lt,
  asc,
  desc,
  exists,
  isNotNull,
  sql,
} from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getRound = cache(
  async (input: { id: string }) => {
    return db.query.rounds.findFirst({
      where: eq(rounds.id, input.id),
      with: {
        awards: {
          orderBy: asc(awards.place),
          with: {
            asset: true,
          },
        },
        community: true,
        proposals: {
          where: eq(proposals.hidden, false),
          orderBy: [desc(proposals.totalVotes), asc(proposals.createdAt)],
          with: {
            user: {
              with: {
                rank: true,
              },
            },
          },
        },
        votes: true,
        minProposerRank: true,
        minVoterRank: true,
      },
    });
  },
  ["rounds"],
  { tags: ["rounds"], revalidate: 60 * 10 }
);

export const getRounds = cache(
  async (input?: {
    stage?: "active" | "upcoming" | "ended";
    limit?: number;
  }) => {
    //
    if (input?.stage) {
      switch (input.stage) {
        case "active":
          return db.query.rounds.findMany({
            where: and(
              lt(rounds.start, new Date()),
              gt(rounds.end, new Date())
            ),
            limit: input.limit,
            orderBy: asc(rounds.end),
            with: {
              awards: {
                with: {
                  asset: true,
                },
              },
              community: true,
            },
          });
        case "upcoming":
          return db.query.rounds.findMany({
            where: gt(rounds.start, new Date()),
            limit: input.limit,
            orderBy: asc(rounds.start),
            with: {
              awards: {
                with: {
                  asset: true,
                },
              },
              community: true,
            },
          });
        case "ended":
          return db.query.rounds.findMany({
            where: lt(rounds.end, new Date()),
            limit: input.limit,
            orderBy: desc(rounds.end),
            with: {
              awards: {
                with: {
                  asset: true,
                },
              },
              community: true,
            },
          });
      }
    }

    return db.query.rounds.findMany({
      limit: input?.limit,
      orderBy: desc(rounds.end),
      where: and(lt(rounds.start, new Date()), isNotNull(rounds.end)),
      with: {
        awards: {
          with: {
            asset: true,
          },
        },
        community: true,
      },
    });
  },
  ["rounds"],
  { tags: ["rounds"], revalidate: 60 * 10 }
);

export const getRoundStats = cache(
  async (input: { id: string }) => {
    const round = await getRound({ id: input.id });

    if (!round) {
      return {
        proposalsCreated: 0,
        votesCast: 0,
        totalParticipants: 0,
      };
    }

    return {
      proposalsCreated: round.proposals.length,
      votesCast: round.votes.length,
      totalParticipants: new Set(
        [...round.proposals, ...round.votes].map((item) => item.user)
      ).size,
    };
  },
  ["roundStats"],
  { tags: ["roundStats"], revalidate: 60 * 10 }
);

export const getRoundsStats = cache(
  async () => {
    const allRounds = await db.query.rounds.findMany({
      where: isNotNull(rounds.end),
      with: {
        awards: {
          columns: {
            asset: true,
            value: true,
          },
        },
        proposals: {
          columns: {
            user: true,
          },
        },
        votes: {
          columns: {
            user: true,
          },
        },
      },
      columns: {
        id: true,
      },
    });

    return {
      roundsCreated: allRounds.length,
      fundsDeployed: allRounds.reduce(
        (total, round) =>
          total +
          round.awards.reduce(
            (roundTotal, award) =>
              award.asset === "usdc"
                ? roundTotal + Number(award.value) / 1000000
                : roundTotal,
            0
          ),
        0
      ),
      totalParticipants: new Set(
        allRounds
          .flatMap((round) => [...round.proposals, ...round.votes])
          .map((item) => item.user)
      ).size,
    };
  },
  ["getStats"],
  {
    tags: ["getStats"],
    revalidate: 60 * 10,
  }
);
