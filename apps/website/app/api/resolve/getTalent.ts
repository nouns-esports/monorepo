import { db, talent } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const getTalent = publicProcedure
  .input(
    z.object({
      roster: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.talent.findMany({
      where: and(eq(talent.active, true), eq(talent.roster, input.roster)),
      orderBy: asc(talent.name),
    });
  });
