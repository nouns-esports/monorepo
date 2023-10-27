import { db, projects } from "@/db/schema";
import { cache } from "react";

export default cache(async () => {
  return db.select().from(projects).orderBy(projects.name);
});
