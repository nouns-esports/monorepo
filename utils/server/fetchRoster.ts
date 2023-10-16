import { db, talent } from "@/db/schema";
import { cache } from "react";
import { eq } from "drizzle-orm";

// Revalidate every 10 minutes
export const revalidate = 600;

export default cache(async (game: string) => {
  return db.select().from(talent).where(eq(talent.game, game));
});
