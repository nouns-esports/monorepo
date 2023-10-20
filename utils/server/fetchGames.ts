import { db, games } from "@/db/schema";
import { cache } from "react";

export default cache(async () => {
  return db.select().from(games).orderBy(games.name);
});
