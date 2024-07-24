import { unstable_cache as cache } from "next/cache";
import { getUser } from "./users";
import { asc, desc, eq, like, or } from "drizzle-orm";
import { userToProfile } from "@/utils/userToProfile";
import { db, art } from "~/packages/db/schema";

export const getArtist = cache(
  async (input: { art: string }) => {
    const artwork = await db.query.art.findFirst({
      where: or(eq(art.id, input.art), like(art.id, `${input.art}%`)),
      columns: {
        artist: true,
      },
    });
    //

    if (artwork?.artist) {
      const user = await getUser({ id: artwork.artist });

      if (user) {
        return userToProfile(user);
      }
    }
  },
  ["art"],
  { tags: ["art"], revalidate: 60 * 10 }
);

export const getArtPiece = cache(
  async (input: { id: string }) => {
    //
    return db.query.art.findFirst({
      where: or(eq(art.id, input.id), like(art.id, `${input.id}%`)),
    });
  },
  ["art"],
  { tags: ["art"], revalidate: 60 * 10 }
);

export const getArt = cache(
  async () => {
    //
    return db.query.art.findMany({ orderBy: desc(art.id) });
  },
  ["art"],
  { tags: ["art"], revalidate: 60 * 10 }
);
