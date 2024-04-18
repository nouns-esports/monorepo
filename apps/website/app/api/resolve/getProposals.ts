import { db, proposals } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const getProposals = publicProcedure
  .input(
    z.object({
      round: z.string().min(1),
      withVotes: z.boolean().optional(),
    })
  )
  .query(async ({ input }) => {
    return db.query.proposals.findMany({
      where: and(eq(proposals.round, input.round), eq(proposals.hidden, false)),
      orderBy: asc(proposals.createdAt),
      with: {
        votes: input.withVotes,
      },
    });
  });
