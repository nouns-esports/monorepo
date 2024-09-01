import { asc, desc, eq, lte } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, rankings, seasons } from "~/packages/db/schema";

export const getCurrentRankings = cache(
  async () => {
    //////
    const season = await db.query.seasons.findFirst({
      orderBy: desc(seasons.start),
      where: lte(seasons.start, new Date()),
      with: {
        rankings: {
          orderBy: desc(rankings.timestamp),
          limit: 1,
        },
      },
    });

    if (!season || season.rankings.length < 1) {
      return [];
    }

    return db.query.rankings.findMany({
      where: eq(rankings.timestamp, season.rankings[0].timestamp),
      orderBy: asc(rankings.place),
      with: {
        rank: true,
        user: true,
      },
    });
  },
  ["getCurrentRanks"],
  { tags: ["getCurrentRanks"], revalidate: 60 * 10 }
);

export const getUserRankings = cache(
  async (input: { user: string }) => {
    return (
      (
        await db.query.seasons.findFirst({
          orderBy: desc(seasons.start),
          where: lte(seasons.start, new Date()),
          with: {
            rankings: {
              where: eq(rankings.user, input.user),
              orderBy: asc(rankings.timestamp),
              with: {
                rank: true,
              },
            },
          },
        })
      )?.rankings ?? []
    );
  },
  ["getUserRankings"],
  { tags: ["getUserRankings"], revalidate: 60 * 10 }
);