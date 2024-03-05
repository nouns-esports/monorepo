import { db, creators as creatorsTable } from "@/server/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { publicProcedure } from "../trpc";

export const creators = publicProcedure.query(async () => {
  return db.query.creators.findMany({
    where: and(eq(creatorsTable.active, true)),
    orderBy: asc(creatorsTable.name),
  });
});
