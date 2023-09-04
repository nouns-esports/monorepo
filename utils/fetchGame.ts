import { db, games } from "@/db/schema";
import { cache } from "react";
import { eq } from "drizzle-orm";

// Revalidate every 10 minutes
export const revalidate = 600;

export default cache(async (id: string) => {
  return (await db.select().from(games).where(eq(games.id, id)))[0];
});
