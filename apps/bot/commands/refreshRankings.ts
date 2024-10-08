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
import { discordClient, privyClient, rest } from "..";
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
import { roles } from "../roles";

export const refreshRankings = createCommand({
  description: "Refreshes the rankings",
  schedule: "0 15 * * *",
  onlyAdmin: true,
  execute: async (interaction) => {
    const guild = discordClient.guilds.cache.get(env.DISCORD_GUILD_ID);

    if (!guild) {
      throw new Error("Guild not found");
    }

    const guildMembers = await guild.members.fetch();

    const now = new Date();
    const currentSeason = await db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
      with: {
        ranks: true,
        xp: {
          where: inArray(
            nexus.discord,
            guildMembers.map((member) => member.user.username)
          ),
          with: {
            user: {
              columns: {
                id: true,
                discord: true,
              },
            },
          },
        },
      },
    });

    if (!currentSeason) {
      throw new Error("Season not found");
    }

    const nexusUsers = new Set(
      currentSeason.xp.map((xp) => ({
        id: xp.user.id,
        discord: xp.user.discord,
      }))
    );

    const users = Array.from(nexusUsers)
      .map((user) => ({
        id: user.id,
        discord: guildMembers.find(
          (member) => member.user.username === user.discord
        ),
      }))
      .filter((user) => user.discord);

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

async function toggleRole(user: string, rank: number) {
  const role = roles(env.NEXT_PUBLIC_ENVIRONMENT).ranks[rank];
  await addRole({ user, role });

  if (role === "Explorer") {
    await removeRole({ user, role: "Challenger" });
    await removeRole({ user, role: "Champion" });
  }

  if (role === "Challenger") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Champion" });
  }

  if (role === "Champion") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Challenger" });
  }
}

async function addRole(input: { user: string; role: string }) {
  return rest.put(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, input.role)
  );
}

async function removeRole(input: { user: string; role: string }) {
  return rest.delete(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, input.role)
  );
}
