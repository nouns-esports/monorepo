import { db, rosters } from "~/packages/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getRosters = cache(
  async (input?: { community?: string; limit?: number }) => {
    if (input?.community) {
      return db.query.rosters.findMany({
        where: and(
          eq(rosters.community, input.community),
          eq(rosters.active, true)
        ),
        with: {
          community: true,
        },
      });
    }

    return db.query.rosters.findMany({
      where: eq(rosters.active, true),
      limit: input?.limit,
      with: {
        community: true,
      },
    });
  },
  ["getRosters"],
  { revalidate: 60 * 10 }
);
