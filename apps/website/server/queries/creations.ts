import { unstable_cache as cache } from "next/cache";
import { desc, eq, like, or } from "drizzle-orm";
import { db, creations } from "~/packages/db/schema";

export const getCreation = cache(
  async (input: { id: string }) => {
    return db.query.creations.findFirst({
      where: or(eq(creations.id, input.id), like(creations.id, `${input.id}%`)),
    });
  },
  ["getCreation"],
  { tags: ["getCreation"], revalidate: 60 * 10 }
);

export const getCreations = cache(
  async () => {
    return db.query.creations.findMany({ orderBy: desc(creations.id) });
  },
  ["getCreations"],
  { tags: ["getCreations"], revalidate: 60 * 10 }
);
