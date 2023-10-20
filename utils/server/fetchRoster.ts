import { db, talent } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export default async function fetchRoster(game: string, roster: string[]) {
  return db
    .select()
    .from(talent)
    .where(and(eq(talent.game, game), inArray(talent.id, roster)));
}
