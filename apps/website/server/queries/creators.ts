import { creators, db } from "~/packages/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getCreators = cache(
  async () => {
    return db.query.creators.findMany({
      where: and(eq(creators.active, true)),
      orderBy: asc(creators.name),
    });
  },
  ["creators"],
  { revalidate: 60 * 10 }
);
