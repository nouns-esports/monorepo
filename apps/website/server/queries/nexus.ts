import { db, nexus } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getNexus = cache(
  async (input: { user: string }) => {
    const userNexus = await db.query.nexus.findFirst({
      where: eq(nexus.user, input.user),
    });
    // --
    if (!userNexus) return;

    return {
      tier: userNexus.tier,
      votes:
        userNexus.tier === "Explorer"
          ? 1
          : userNexus.tier === "Challenger"
            ? 3
            : 10,
    } as const;
  },
  ["nexus"],
  { tags: ["nexus"], revalidate: 60 * 10 }
);
