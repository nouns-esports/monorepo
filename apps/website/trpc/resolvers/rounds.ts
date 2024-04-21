import { db, rounds } from "@/db/schema";
import { eq, gt, and, lt, asc, desc } from "drizzle-orm";
import { publicProcedure } from "@/trpc";
import { z } from "zod";

export const getRound = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.rounds.findFirst({
      where: eq(rounds.id, input.id),
    });
  });

export const getRounds = publicProcedure
  .input(
    z.object({
      stage: z.enum(["active", "upcoming", "ended"]).optional(),
      max: z.number().optional(),
    })
  )
  .query(async ({ input }) => {
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
  });
