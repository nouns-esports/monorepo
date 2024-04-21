import { db, users } from "@/db/schema";
import { onlyUser, publicProcedure } from "@/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { privyClient } from "../clients/privy";
import { TRPCError } from "@trpc/server";

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

export const createUser = onlyUser
  .input(
    z.object({
      id: z.string().min(1),
      pass: z.boolean().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    if (ctx.userClaim.userId !== input.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to create this user",
      });
    }

    return db.insert(users).values(input);
  });
