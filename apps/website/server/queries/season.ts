import { and, gte, lte } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, seasons } from "~/packages/db/schema";

export const getCurrentSeason = cache(
  async () => {
    const now = new Date();

    return db.query.seasons.findFirst({
      where: and(lte(seasons.start, now), gte(seasons.end, now)),
    });
  },
  ["getCurrentSeason"],
  { tags: ["getCurrentSeason"], revalidate: 60 * 60 * 24 }
);
