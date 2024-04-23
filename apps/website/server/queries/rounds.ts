import { db, rounds } from "@/db/schema";
import { eq, gt, and, lt, asc, desc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getRound = cache(
  async (input: { id: string }) => {
    return db.query.rounds.findFirst({
      where: eq(rounds.id, input.id),
    });
  },
  ["round"],
  { tags: ["round"], revalidate: 60 * 10 }
);

export const getRounds = cache(
  async (input: { stage: "active" | "upcoming" | "ended"; max?: number }) => {
    if (input.stage) {
      switch (input.stage) {
        case "active":
          return db.query.rounds.findMany({
            where: and(
              lt(rounds.start, new Date()),
              gt(rounds.end, new Date())
            ),
            limit: input.max ?? undefined,
            orderBy: asc(rounds.end),
          });
        case "upcoming":
          return db.query.rounds.findMany({
            where: gt(rounds.start, new Date()),
            limit: input.max ?? undefined,
            orderBy: asc(rounds.start),
          });
        case "ended":
          return db.query.rounds.findMany({
            where: lt(rounds.end, new Date()),
            limit: input.max ?? undefined,
            orderBy: desc(rounds.end),
          });
      }
    }

    return db.query.rounds.findMany({
      limit: input.max ?? undefined,
      orderBy: asc(rounds.end),
    });
  },
  ["rounds"],
  { tags: ["rounds"], revalidate: 60 * 10 }
);
