import { db, creators } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { publicProcedure } from "@/trpc";

export const getCreators = publicProcedure.query(async () => {
  return db.query.creators.findMany({
    where: and(eq(creators.active, true)),
    orderBy: asc(creators.name),
  });
});
