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
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  isNotNull,
  lte,
} from "drizzle-orm";

export const refreshRankings = createCommand({
  description: "Refreshes the rankings",
  schedule: "0 15 * * *",
  onlyAdmin: true,
  execute: async (interaction) => {
    const guild = discordClient.guilds.cache.get(env.DISCORD_GUILD_ID);

    if (!guild) {
      throw new Error("Guild not found");
    }

    const now = new Date();
    const currentSeason = await db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
      with: {
        ranks: true,
        xp: {
          where: inArray(
            nexus.discord,
            (await guild.members.fetch()).map((member) => member.user.username)
          ),
        },
      },
    });

    if (!currentSeason) {
      throw new Error("Season not found");
    }

    let userXP: Record<string, number | undefined> = {};

    for (const record of currentSeason.xp) {
      userXP[record.user] = record.amount + (userXP[record.user] ?? 0);
    }

    const leaderboard = Object.entries(userXP)
      .map(([user, xp]) => ({
        user,
        xp: xp ?? 0,
      }))
      .toSorted((a, b) => b.xp - a.xp);

    await db.transaction(async (tx) => {
      for (const entry of leaderboard) {
        // TODO: grant roles
        await tx
          .update(nexus)
          .set({
            rank: 1, // TODO: Calculate rank
          })
          .where(eq(nexus.id, entry.user));

        await tx.insert(rankings).values(
          leaderboard.map((entry) => ({
            rank: 1, // TODO: Calculate rank
            timestamp: now,
            season: currentSeason.id,
            user: entry.user,
            xp: entry.xp,
          }))
        );
      }
    });

    return "Rankings refreshed successfully";
  },
});
