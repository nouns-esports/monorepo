import { db, games } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getGame = cache(
  async (input: { id: string }) => {
    return db.query.games.findFirst({
      where: and(eq(games.active, true), eq(games.id, input.id)),
    });
  },
  ["game"],
  { revalidate: 60 * 10 }
);

export const getGames = cache(
  async () => {
    return db.query.games.findMany({
      where: eq(games.active, true),
      orderBy: asc(games.name),
    });
  },
  ["games"],
  { revalidate: 60 * 10 }
);
