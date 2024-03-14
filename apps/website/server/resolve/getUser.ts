import { db, users as usersTable } from "@/server/db/schema";
import { publicProcedure } from "../trpc";
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
      where: eq(usersTable.wallet, input.address),
    });
  });
