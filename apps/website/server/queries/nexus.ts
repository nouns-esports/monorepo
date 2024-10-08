import { db, nexus } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getNexus = cache(
  async (input: { user: string }) => {
    return db.query.nexus.findFirst({
      where: eq(nexus.id, input.user),
      with: {
        rank: true,
      },
    });
  },
  ["nexus"],
  { tags: ["nexus"], revalidate: 60 * 10 }
);
