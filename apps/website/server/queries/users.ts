import { unstable_cache as cache } from "next/cache";
import { privyClient } from "@/server/clients/privy";
import { User as PrivyUser } from "@privy-io/server-auth";
import { cookies } from "next/headers";

export const getUser = cache(
  async (input: { id: string }) => {
    try {
      let privyUser: PrivyUser | null;

      if (input.id.startsWith("0x")) {
        privyUser = await privyClient.getUserByWalletAddress(input.id);
      } else {
        privyUser = await privyClient.getUser(input.id);
      }

      if (!privyUser) throw new Error("User not found");

      return {
        id: privyUser.id,
        name: privyUser.farcaster?.displayName,
        pfp: privyUser.farcaster?.pfp,
      };
    } catch (e) {
      return {
        id: input.id,
        name: undefined,
        pfp: undefined,
      };
    }
  },
  ["users"],
  { tags: ["users"], revalidate: 60 * 10 }
);

export function getAuthenticatedUser(
  withUserObject: true
): Promise<PrivyUser | undefined>;
export function getAuthenticatedUser(
  withUserObject?: false
): Promise<string | undefined>;
export async function getAuthenticatedUser(withUserObject?: boolean) {
  const session = cookies().get("privy-token")?.value;

  try {
    if (!session) {
      throw new Error("No Privy session found");
    }

    const user = await privyClient.verifyAuthToken(session);

    if (withUserObject) return privyClient.getUser(user.userId);

    return user.userId;
  } catch (error) {}
}
