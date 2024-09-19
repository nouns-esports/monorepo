"use server";

import { z } from "zod";
import { actionClient } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, rankings, ranks, seasons } from "~/packages/db/schema";
import { and, asc, desc, gte, lte } from "drizzle-orm";
import { getAuthenticatedPrivyUserWithData } from "../queries/users";
import { env } from "~/env";

export const createNexus = actionClient
  .schema(
    z.object({
      name: z.string(),
      image: z.string().optional(),
      bio: z.string().optional(),
      interests: z.array(z.string()).optional(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const privyUser = await getAuthenticatedPrivyUserWithData();

    if (!privyUser) {
      throw new Error("No privy user found");
    }

    const currentSeason = await db.query.seasons.findFirst({
      orderBy: desc(seasons.start),
      where: lte(seasons.start, new Date()),
      with: {
        ranks: {
          orderBy: asc(ranks.place),
          limit: 1,
        },
      },
    });

    if (!currentSeason) {
      throw new Error("No active season found");
    }

    const lowestRank = currentSeason.ranks[0];

    if (!lowestRank) {
      throw new Error("No ranks found");
    }

    let place: number | null = null;

    if (privyUser.discord) {
      const [lowestRanking, discordResponse] = await Promise.all([
        db.query.rankings.findFirst({
          orderBy: and(desc(rankings.timestamp), desc(rankings.place)),
        }),

        fetch(
          `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${privyUser.discord.subject}`,
          {
            headers: {
              Authorization: `Bot ${env.DISCORD_TOKEN}`,
            },
          }
        ),
      ]);

      if (!currentSeason) {
        throw new Error("No current season");
      }

      if (!lowestRanking) {
        throw new Error("Nobody is ranked");
      }

      if (discordResponse.ok) {
        place = lowestRanking.place + 1;
      }
    }

    await db.transaction(async (tx) => {
      if (place) {
        await tx.insert(rankings).values({
          place,
          season: currentSeason.id,
          user: privyUser.id,
          timestamp: new Date(),
          rank: lowestRank.id,
        });
      }

      await tx.insert(nexus).values({
        id: privyUser.id,
        rank: place ? lowestRank.id : null,
        name: parsedInput.name,
        image: parsedInput.image,
        bio: parsedInput.bio,
        interests: parsedInput.interests,
        wallet: privyUser.wallet,
        twitter: privyUser.twitter,
        discord: privyUser.discord,
        farcaster: privyUser.farcaster,
        linkedAccounts: privyUser.linkedAccounts,
      });
    });

    revalidatePath("/nexus");
  });
