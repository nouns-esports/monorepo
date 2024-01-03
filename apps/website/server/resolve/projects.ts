import { projects as projectsTable } from "@/db/schema";
import { db } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";

export const projects = publicProcedure.query(async () => {
  return db.query.projects.findMany({
    where: eq(projectsTable.active, true),
    orderBy: asc(projectsTable.name),
  });
});
