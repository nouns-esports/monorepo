import { db, users } from "@/server/db/schema";
import { publicProcedure } from "../clients/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getUser = publicProcedure
  .input(
    z.object({
      address: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.users.findFirst({
      where: eq(users.wallet, input.address),
    });
  });
