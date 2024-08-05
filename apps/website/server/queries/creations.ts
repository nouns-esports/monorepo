import { unstable_cache as cache } from "next/cache";
import { desc, eq, like, or } from "drizzle-orm";
import { db, creations } from "~/packages/db/schema";
import { getUser } from "./users";
import { userToProfile } from "@/utils/userToProfile";

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

export const getCreator = cache(
  async (input: { creationId: string }) => {
    const creation = await db.query.creations.findFirst({
      where: or(
        eq(creations.id, input.creationId),
        like(creations.id, `${input.creationId}%`)
      ),
    });

    if (!creation?.creator) return;

    const user = await getUser({ id: creation.creator });

    if (!user) return;

    return userToProfile(user);
  },
  ["getCreator"],
  { tags: ["getCreator"], revalidate: 60 * 10 }
);
