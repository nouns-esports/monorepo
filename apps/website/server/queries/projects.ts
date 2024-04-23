import { db, projects } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getProjects = cache(
  async () => {
    return db.query.projects.findMany({
      where: eq(projects.active, true),
      orderBy: asc(projects.name),
    });
  },
  ["projects"],
  { revalidate: 60 * 10 }
);
