"use server";

import { z } from "zod";
import { actionClient } from ".";
import { revalidatePath } from "next/cache";
import { db, nexus, ranks, seasons } from "~/packages/db/schema";
import { asc, desc, lte } from "drizzle-orm";
import { getAuthenticatedPrivyUserWithData } from "../queries/users";

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

    await db.insert(nexus).values({
      id: privyUser.id,
      rank: lowestRank.id,
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

    revalidatePath("/nexus");
  });
