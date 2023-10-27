import { db, talent } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { cache } from "react";

export default cache(async (game: string, roster: string[]) => {
  return db
    .select()
    .from(talent)
    .where(and(eq(talent.game, game), inArray(talent.id, roster)));
});
