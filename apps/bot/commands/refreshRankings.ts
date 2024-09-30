import {
  db,
  events,
  nexus,
  rankings,
  ranks,
  seasons,
  xp,
} from "~/packages/db/schema";
import { createCommand } from "../createCommand";
import { discordClient, privyClient } from "..";
import { env } from "~/env";
import { Routes } from "discord.js";
import { and, asc, desc, eq, gt, gte, isNotNull, lte } from "drizzle-orm";

export const refreshRankings = createCommand({
  description: "Refreshes the rankings",
  schedule: "0 15 * * *",
  execute: async (interaction) => {
    const guild = discordClient.guilds.cache.get(env.DISCORD_GUILD_ID);

    if (!guild) {
      throw new Error("Guild not found");
    }

    const now = new Date();
    const currentSeason = await db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
    });

    if (!currentSeason) {
      throw new Error("Season not found");
    }

    const [xpRecords, privyUsers, guildMembers, seasonRanks] =
      await Promise.all([
        db.query.xp.findMany({
          where: eq(seasons.id, currentSeason.id),
        }),
        privyClient.getUsers(),
        guild.members.fetch(),
        db.query.ranks.findMany({
          where: eq(ranks.season, currentSeason.id),
          orderBy: desc(ranks.place),
        }),
      ]);

    let userXP: Record<string, number | undefined> = {};

    for (const record of xpRecords) {
      userXP[record.user] = record.amount + (userXP[record.user] ?? 0);
    }

    const leaderboard = Object.entries(userXP)
      .map(([user, xp]) => ({
        user,
        xp: xp ?? 0,
      }))
      .toSorted((a, b) => b.xp - a.xp);

    await db.transaction(async (tx) => {});

    return "Rankings refreshed successfully";
  },
});
