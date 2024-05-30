import { db, nexus } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getNexus = cache(
  async (input: { user: string }) => {
    const data = await db.query.nexus.findFirst({
      where: eq(nexus.user, input.user),
    });

    if (!data) return;

    return {
      tier:
        data.tier === 0 ? "Explorer" : data.tier === 1 ? "Challenger" : "Elite",
      votes: data.tier === 0 ? 1 : data.tier === 1 ? 3 : 10,
    };
  },
  ["nexus"],
  { tags: ["nexus"], revalidate: 60 * 10 }
);
