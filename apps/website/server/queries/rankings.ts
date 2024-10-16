import { and, asc, desc, eq, lte, or } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, rankings, seasons } from "~/packages/db/schema";

export const getCurrentRankings = cache(
  async (input?: { user?: string }) => {
    ////
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

    const latestTimestamp = season.rankings[0].timestamp;

    const [currentRankings, userRanking] = await Promise.all([
      db.query.rankings.findMany({
        where: eq(rankings.timestamp, latestTimestamp),
        orderBy: desc(rankings.xp),
        limit: 100,
        with: {
          rank: true,
          user: true,
        },
      }),
      input?.user
        ? db.query.rankings.findFirst({
            where: and(
              eq(rankings.user, input.user),
              eq(rankings.timestamp, latestTimestamp)
            ),
            with: {
              rank: true,
              user: true,
            },
          })
        : undefined,
    ]);

    if (!userRanking) {
      return currentRankings;
    }

    return [...currentRankings, userRanking].toSorted((a, b) => b.xp - a.xp);
  },
  ["getCurrentRanks"],
  { tags: ["getCurrentRanks"], revalidate: 60 * 10 }
);

export const getUserRankings = cache(
  async (input: { user: string }) => {
    //
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
