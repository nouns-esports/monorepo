import { db, projects } from "@/db/schema";

export default async function fetchProjects() {
  return db.select().from(projects).orderBy(projects.name);
}
