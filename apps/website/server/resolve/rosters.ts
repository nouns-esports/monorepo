import { db, rosters as rostersTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const rosters = publicProcedure
  .input(
    z.object({
      game: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.rosters.findMany({
      where: and(
        eq(rostersTable.game, input.game),
        eq(rostersTable.active, true)
      ),
    });
  });
