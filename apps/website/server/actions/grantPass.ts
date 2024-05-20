"use server";

import { db, pass } from "@/db/schema";
import { onlyUserAction } from "@/server/actions";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { privyClient } from "../clients/privy";
import { User } from "@privy-io/server-auth";
import { isInServer } from "../queries/discord";

export const grantPass = onlyUserAction(
  z.object({
    user: z.string().min(1),
  }),
  async (input, context) => {
    let privyUser: User;

    try {
      privyUser = await privyClient.getUser(context.user);
    } catch (e) {
      throw new Error("User not found");
    }

    if (!privyUser.discord?.username) {
      throw new Error("Discord not connected");
    }

    const inDiscord = await isInServer({ user: privyUser.discord.username });

    if (!inDiscord) {
      throw new Error("Not in discord");
    }

    await db.insert(pass).values({
      user: context.user,
      tier: 0,
    });

    revalidateTag("pass");
  }
);
