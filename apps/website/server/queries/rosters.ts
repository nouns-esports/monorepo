import { db, rosters } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getRosters = cache(
  async (input: { game: string }) => {
    return db.query.rosters.findMany({
      where: and(eq(rosters.game, input.game), eq(rosters.active, true)),
    });
  },
  ["rosters"],
  { revalidate: 60 * 10 }
);
