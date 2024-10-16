import { db, nexus, rankings, ranks, seasons } from "~/packages/db/schema";
import { createCommand } from "../createCommand";
import { discordClient } from "..";
import { env } from "~/env";
import { and, desc, eq, gte, lte } from "drizzle-orm";

export const refreshRankings = createCommand({
  description: "Refreshes the rankings",
  schedule: "0 15 * * *",
  onlyAdmin: true,
  execute: async () => {
    const guild = discordClient.guilds.cache.get(env.DISCORD_GUILD_ID);

    if (!guild) {
      throw new Error("Guild not found");
    }

    const now = new Date();

    const currentSeason = await db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
      with: {
        ranks: {
          orderBy: desc(ranks.place),
        },
        xp: true,
        rankings: {
          orderBy: desc(rankings.timestamp),
          limit: 1,
        },
      },
    });

    if (!currentSeason) {
      throw new Error("Season not found");
    }

    const previousLeaderboard = currentSeason.rankings[0]
      ? await db.query.rankings.findMany({
          where: eq(
            rankings.timestamp,
            new Date(currentSeason.rankings[0].timestamp)
          ),
          orderBy: desc(rankings.xp),
        })
      : [];

    const records: Record<string, number | undefined> = {};

    for (const xp of currentSeason.xp) {
      records[xp.user] = (records[xp.user] ?? 0) + xp.amount;
    }

    const leaderboard = Object.entries(records)
      .map(([user, xp]) => ({
        user,
        xp: xp ?? 0,
      }))
      .toSorted((a, b) => b.xp - a.xp);

    await db.transaction(async (tx) => {
      for (let i = 0; i < leaderboard.length; i++) {
        const percentile = (i + 1) / leaderboard.length;
        const rank =
          currentSeason.ranks.find((r) => percentile <= Number(r.percentile)) ??
          currentSeason.ranks[currentSeason.ranks.length - 1];

        let diff = 0;

        const previousRankingIndex = previousLeaderboard.findIndex(
          (previousRanking) => previousRanking.user === leaderboard[i].user
        );

        if (previousRankingIndex > -1) {
          diff = (i - previousRankingIndex) * -1;
        }

        console.log(
          "Refreshing",
          `${i + 1}/${leaderboard.length}`,
          leaderboard[i].user,
          rank.name
        );

        await tx
          .update(nexus)
          .set({
            rank: rank.id,
          })
          .where(eq(nexus.id, leaderboard[i].user));

        await tx.insert(rankings).values({
          rank: rank.id,
          timestamp: now,
          diff,
          position: i + 1,
          season: currentSeason.id,
          user: leaderboard[i].user,
          xp: leaderboard[i].xp,
        });
      }
    });

    return "Rankings refreshed successfully";
  },
});
