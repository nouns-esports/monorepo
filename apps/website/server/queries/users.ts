import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getUser = cache(
  async (input: { id: string }) => {
    return db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
  },
  ["user"],
  { tags: ["user"], revalidate: 60 * 10 }
);
