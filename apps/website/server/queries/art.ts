import { unstable_cache as cache } from "next/cache";
import { getUser } from "./users";
import { eq } from "drizzle-orm";
import { userToProfile } from "@/utils/userToProfile";
import { db, art } from "~/packages/db/schema";

export const getArtist = cache(
  async (input: { art: string }) => {
    const artwork = await db.query.art.findFirst({
      where: eq(art.id, input.art),
      columns: {
        artist: true,
      },
    });

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
