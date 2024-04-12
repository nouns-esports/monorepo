import { db, proposals } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { publicProcedure } from "../trpc";

export const getProposals = publicProcedure.query(async () => {
  return db.query.proposals.findMany({
    where: eq(proposals.hidden, false),
    orderBy: asc(proposals.createdAt),
  });
});
