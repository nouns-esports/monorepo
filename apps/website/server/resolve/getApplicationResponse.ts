import { db, applicationResponses } from "@/server/db/schema";
import { publicProcedure } from "../clients/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getApplicationResponse = publicProcedure
  .input(
    z.object({
      wallet: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.applicationResponses.findFirst({
      where: eq(applicationResponses.user, input.wallet),
    });
  });
