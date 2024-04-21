import { db, projects } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { publicProcedure } from "@/trpc";

export const getProjects = publicProcedure.query(async () => {
  return db.query.projects.findMany({
    where: eq(projects.active, true),
    orderBy: asc(projects.name),
  });
});
