import { db, proposals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const getProposal = publicProcedure
  .input(
    z.object({
      id: z.number().int(),
    })
  )
  .query(async ({ input }) => {
    return db.query.proposals.findFirst({
      where: eq(proposals.id, input.id),
    });
  });
