import { db, games } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { publicProcedure } from "../clients/trpc";
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
