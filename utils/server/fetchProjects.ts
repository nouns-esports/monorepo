import { db, projects } from "@/db/schema";
import { cache } from "react";

// Revalidate every 10 minutes
export const revalidate = 600;

export default cache(async () => {
  return db.select().from(projects).orderBy(projects.name);
});
