import { db, users } from "@/server/db/schema";
import { publicProcedure } from "../clients/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getId = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    return db.query.users
      .findFirst({
        where: eq(users.id, input.id),
        columns: {
          id: true,
        },
      })
      .then((user) => user?.id);
  });
