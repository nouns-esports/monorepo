import { awards, db, proposals, type Award } from "~/packages/db/schema";
import { eq, asc, desc, and, gt } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

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

export const getUserAwards = cache(
  async (input: { user: string }) => {
    const applicableRounds = await db.query.proposals.findMany({
      where: and(eq(proposals.user, input.user), gt(proposals.totalVotes, 0)),
      with: {
        round: {
          with: {
            awards: {
              with: {
                asset: {
                  columns: {
                    image: true,
                  },
                },
              },
            },
            proposals: {
              orderBy: desc(proposals.totalVotes),
              where: gt(proposals.totalVotes, 0),
              columns: {
                user: true,
              },
            },
          },
          columns: {
            id: true,
            end: true,
            name: true,
            image: true,
          },
        },
      },
      columns: {},
    });

    const userAwards: Array<
      Omit<Omit<Award, "round">, "asset"> & {
        round: {
          id: string;
          name: string;
          image: string;
        };
        asset: {
          image: string;
        };
      }
    > = [];

    for (const { round } of applicableRounds) {
      if (new Date() < new Date(round.end ?? 0)) {
        continue;
      }

      for (let i = 0; i < round.awards.length; i++) {
        if (round.proposals[i].user === input.user) {
          userAwards.push({
            ...round.awards[i],
            round: {
              id: round.id,
              name: round.name,
              image: round.image,
            },
          });
        }
      }
    }

    return userAwards;
  },
  ["awards"],
  { tags: ["awards"], revalidate: 60 * 10 }
);
