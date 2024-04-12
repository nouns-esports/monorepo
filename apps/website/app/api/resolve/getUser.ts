import { db, users } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

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
