import { desc, lte } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, seasons } from "~/packages/db/schema";

export const getCurrentRanks = cache(
  async () => {
    return (
      (
        await db.query.seasons.findFirst({
          orderBy: desc(seasons.start),
          where: lte(seasons.start, new Date()),
          with: {
            ranks: true,
          },
        })
      )?.ranks ?? []
    );
  },
  ["getCurrentRanks"],
  { tags: ["getCurrentRanks"], revalidate: 60 * 10 }
);
