import { unstable_cache as cache } from "next/cache";
import { privyClient } from "@/server/clients/privy";
import type { User } from "@privy-io/server-auth";
import { cookies } from "next/headers";

export const getUser = cache(
  async (input: { id: string }) => {
    try {
      let privyUser: User | null;

      if (input.id.startsWith("0x")) {
        privyUser = await privyClient.getUserByWalletAddress(input.id);
      } else {
        privyUser = await privyClient.getUser(input.id);
      }

      if (!privyUser) return;

      return privyUser;
    } catch (e) {}
  },
  ["users"],
  { tags: ["users"], revalidate: 60 * 15 }
);

export function getAuthenticatedUser(
  withUserObject: true
): Promise<User | undefined>;
export function getAuthenticatedUser(
  withUserObject?: false
): Promise<string | undefined>;
export async function getAuthenticatedUser(withUserObject?: boolean) {
  const session = cookies().get("privy-token")?.value;

  try {
    if (!session) return;

    const user = await privyClient.verifyAuthToken(session);

    if (withUserObject) return privyClient.getUser(user.userId);

    return user.userId;
  } catch (error) {}
}
