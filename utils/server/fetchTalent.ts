import { db, talent } from "@/db/schema";

export default async function fetchTalent() {
  return db.select().from(talent);
}
