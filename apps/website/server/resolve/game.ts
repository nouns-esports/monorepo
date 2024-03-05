import { db, games as gamesTable } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const game = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.games.findFirst({
      where: and(eq(gamesTable.active, true), eq(gamesTable.id, input.id)),
    });
  });
