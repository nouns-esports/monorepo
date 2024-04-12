import { db, applicationResponses } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getApplicationResponse = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .query(async ({ input }) => {
    return db.query.applicationResponses.findFirst({
      where: eq(applicationResponses.user, input.id),
    });
  });
