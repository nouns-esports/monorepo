import { db, games } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export default cache(async (id: string) => {
  return (await db.select().from(games).where(eq(games.id, id)))[0];
});
