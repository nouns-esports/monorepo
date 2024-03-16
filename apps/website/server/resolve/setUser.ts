import { db, users } from "@/server/db/schema";
import { publicProcedure } from "../clients/trpc";
import { z } from "zod";
import { privyClient } from "../clients/privy";

export const setUser = publicProcedure
  .input(
    z.object({
      token: z.string(),
      id: z
        .string()
        .min(1)
        .regex(/^[a-z0-9_]+$/),
      wallet: z.string(),
      pass: z.enum(["og", "vip", "community", "premium"]),
    })
  )
  .mutation(async ({ input }) => {
    const { token, ...values } = input;

    await privyClient.verifyAuthToken(token);

    return db.insert(users).values(values);
  });
