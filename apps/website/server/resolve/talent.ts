import { db, talent as talentTable } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const talent = publicProcedure
  .input(
    z.object({
      roster: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.talent.findMany({
      where: and(
        eq(talentTable.active, true),
        eq(talentTable.roster, input.roster)
      ),
      orderBy: asc(talentTable.name),
    });
  });
