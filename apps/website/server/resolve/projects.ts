import { db, projects as projectsTable } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";

export const projects = publicProcedure.query(async () => {
  return db.query.projects.findMany({
    where: eq(projectsTable.active, true),
    orderBy: asc(projectsTable.name),
  });
});
