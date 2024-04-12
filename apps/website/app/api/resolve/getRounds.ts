import { db, rounds } from "@/db/schema";
import { gt, and, lt, asc } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

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
            orderBy: asc(rounds.end),
          });
      }
    }

    return db.query.rounds.findMany({
      limit: input.max ?? undefined,
      orderBy: asc(rounds.end),
    });
  });
