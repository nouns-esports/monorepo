import { unstable_cache as cache } from "next/cache";
import { privyClient } from "@/server/clients/privy";
import { User as PrivyUser } from "@privy-io/server-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type User = {
  id: string;
  name?: string;
  pfp?: string;
};

export const getUser = cache(async (input: { id: string }) => {
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
});

export async function getAuthenticatedUser() {
  const session = cookies().get("privy-token")?.value;

  if (!session) {
    throw new Error("No Privy session found");
  }

  try {
    return (await privyClient.verifyAuthToken(session)).userId;
  } catch (error) {}

  return redirect("/refresh");
}
