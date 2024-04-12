import { db, rounds } from "@/db/schema";
import { eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const getRound = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.rounds.findFirst({
      where: eq(rounds.id, input.id),
    });
  });
