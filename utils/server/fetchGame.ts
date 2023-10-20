import { db, games } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function fetchGame(id: string) {
  return (await db.select().from(games).where(eq(games.id, id)))[0];
}
