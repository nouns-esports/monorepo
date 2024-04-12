import { db, users } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { privyClient } from "./clients/privy";

export const setUser = publicProcedure
  .input(
    z.object({
      token: z.string().min(1),
      id: z.string().min(1),
      pass: z.enum(["og", "vip", "community", "premium"]),
    })
  )
  .mutation(async ({ input }) => {
    const { token, ...values } = input;

    await privyClient.verifyAuthToken(token);

    return db.insert(users).values(values);
  });
