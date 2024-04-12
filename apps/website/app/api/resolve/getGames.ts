import { db, games } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { publicProcedure } from "../trpc";

export const getGames = publicProcedure.query(async () => {
  return db.query.games.findMany({
    where: eq(games.active, true),
    orderBy: asc(games.name),
  });
});
