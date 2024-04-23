import { awards, db } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getAwards = cache(
  async (input: { round: string }) => {
    return db.query.awards.findMany({
      where: eq(awards.round, input.round),
      orderBy: asc(awards.place),
    });
  },
  ["awards"],
  { revalidate: 60 * 10 }
);
