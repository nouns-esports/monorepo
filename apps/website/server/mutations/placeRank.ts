"use server";

import { env } from "~/env";
import { onlyUser } from ".";
import { z } from "zod";
import { db, nexus, rankings, ranks, seasons } from "~/packages/db/schema";
import { and, lte, gte, desc, eq, asc } from "drizzle-orm";
import checkDiscordAccountAge from "@/utils/checkDiscordAccountAge";

export const placeRank = onlyUser.action(async ({ parsedInput, ctx }) => {
  if (!ctx.user.discord?.subject) {
    throw new Error("You must connect a Discord account first");
  }

  if (!checkDiscordAccountAge(ctx.user.discord.subject)) {
    throw new Error("Your Discord account is not old enough");
  }

  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${ctx.user.discord.subject}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("User not in server");
  }

  const now = new Date();

  const [lowestRanking, currentSeason] = await Promise.all([
    db.query.rankings.findFirst({
      orderBy: and(desc(rankings.timestamp), desc(rankings.place)),
    }),
    db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
      orderBy: desc(seasons.start),
      with: {
        ranks: {
          orderBy: asc(ranks.place),
          limit: 1,
        },
      },
    }),
  ]);

  if (!currentSeason) {
    throw new Error("No current season");
  }

  const lowestRank = currentSeason.ranks[0];

  if (!lowestRank) {
    throw new Error("No ranks found");
  }

  if (!lowestRanking) {
    throw new Error("Nobody is ranked");
  }

  await db.transaction(async (tx) => {
    await tx
      .update(nexus)
      .set({ rank: lowestRank.id })
      .where(eq(nexus.id, ctx.user.id));
    await tx.insert(rankings).values({
      user: ctx.user.id,
      season: currentSeason.id,
      place: lowestRanking.place + 1,
      timestamp: now,
      rank: lowestRank.id,
    });
  });
});
