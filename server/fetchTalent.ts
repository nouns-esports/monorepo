import { db, talent } from "@/db/schema";
import { cache } from "react";

export default cache(async () => {
  return db.select().from(talent);
});
