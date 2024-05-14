import { db, pass } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getPass = cache(
  async (input: { user: string }) => {
    return db.query.pass.findFirst({
      where: eq(pass.user, input.user),
    });
  },
  ["pass"],
  { tags: ["pass"], revalidate: 1 }
);
