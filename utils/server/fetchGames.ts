import { db, games } from "@/db/schema";

export default async function fetchGames() {
  return db.select().from(games).orderBy(games.name);
}
