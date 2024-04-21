import { db, awards } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { publicProcedure } from "@/trpc";
import { z } from "zod";

export const getAwards = publicProcedure
  .input(
    z.object({
      round: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.awards.findMany({
      where: eq(awards.round, input.round),
      orderBy: asc(awards.place),
    });
  });
