import { db, games } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { publicProcedure } from "@/trpc";
import { z } from "zod";

export const getGame = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.games.findFirst({
      where: and(eq(games.active, true), eq(games.id, input.id)),
    });
  });

export const getGames = publicProcedure.query(async () => {
  return db.query.games.findMany({
    where: eq(games.active, true),
    orderBy: asc(games.name),
  });
});
