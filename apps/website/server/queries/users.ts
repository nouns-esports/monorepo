import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { privyClient } from "@/server/clients/privy";

export type User = {
  id: string;
  pfp: string;
  name: string;
  handle?: string;
  bio?: string;
};

export const getUser = cache(
  async (input: { id: string }): Promise<User> => {
    const [privyUser, dbUser] = await Promise.all([
      await privyClient.getUser(
        // input.id
        "did:privy:clvctgk910lfdk7zywimbzbh8"
      ),
      await db.query.users.findFirst({
        where: eq(
          users.id,
          "did:privy:clvctgk910lfdk7zywimbzbh8"
          // input.id
        ),
      }),
    ]);

    if (!privyUser || !dbUser) {
      console.log(privyUser, dbUser);
      throw new Error("User not found");
    }

    return {
      id: input.id,
      pfp:
        privyUser.farcaster?.pfp ??
        privyUser.twitter?.profilePictureUrl ??
        `https://api.cloudnouns.com/v1/pfp?text=${input.id}`,
      name:
        privyUser.farcaster?.displayName ??
        privyUser.twitter?.name ??
        input.id.substring(10, 15),
      handle:
        privyUser.farcaster?.username ??
        privyUser.discord?.username ??
        privyUser.twitter?.username ??
        undefined,
      bio: privyUser.farcaster?.bio,
    };
  },
  ["user"],
  { tags: ["user"], revalidate: 60 * 10 }
);
