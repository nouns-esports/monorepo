import { db, communities } from "~/packages/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getCommunities = cache(
  async () => {
    return db.query.communities.findMany({
      orderBy: asc(communities.name),
    });
  },
  ["getCommunities"],
  { revalidate: 60 * 10 }
);
