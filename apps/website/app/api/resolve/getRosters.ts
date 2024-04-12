import { db, rosters } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const getRosters = publicProcedure
  .input(
    z.object({
      game: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.rosters.findMany({
      where: and(eq(rosters.game, input.game), eq(rosters.active, true)),
    });
  });
