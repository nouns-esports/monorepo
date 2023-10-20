import { db, talent } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function fetchRoster(game: string) {
  return db.select().from(talent).where(eq(talent.game, game));
}
