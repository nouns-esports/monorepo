import { awards, db, proposals, rounds } from "~/packages/db/schema";
import { eq, gt, and, lt, asc, desc, exists, isNotNull } from "drizzle-orm";
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

export const getStats = cache(
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

    let fundsDeployed = 0;

    const uniqueParticipants: Record<string, boolean> = {};

    for (const round of allRounds) {
      for (const award of round.awards) {
        if (award.asset === "usdc") {
          fundsDeployed += Number(award.value) / 1000000;
        }
      }

      for (const proposal of round.proposals) {
        uniqueParticipants[proposal.user] = true;
      }

      for (const vote of round.votes) {
        uniqueParticipants[vote.user] = true;
      }
    }

    return {
      roundsCreated: allRounds.length,
      fundsDeployed,
      totalParticipants: Object.keys(uniqueParticipants).length,
    };
  },
  ["getStats"],
  {
    tags: ["getStats"],
    revalidate: 60 * 10,
  }
);
