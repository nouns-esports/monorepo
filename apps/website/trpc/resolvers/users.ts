import { db, users } from "@/db/schema";
import { publicProcedure } from "@/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { privyClient } from "../clients/privy";

export const getUser = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
  });

export const createUser = publicProcedure
  .input(
    z.object({
      token: z.string().min(1),
      id: z.string().min(1),
      pass: z.boolean().optional(),
    })
  )
  .mutation(async ({ input }) => {
    const { token, ...values } = input;

    await privyClient.verifyAuthToken(token);

    return db.insert(users).values(values);
  });
