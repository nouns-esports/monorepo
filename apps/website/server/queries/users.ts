import { unstable_cache as cache } from "next/cache";
import { privyClient } from "@/server/clients/privy";
import type { User as PrivyUser } from "@privy-io/server-auth";
import { cookies } from "next/headers";
import * as jose from "jose";
import { env } from "~/env";

export const getUser = cache(
  async (input: { id: string }) => {
    try {
      let privyUser: PrivyUser | null;

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

export async function getAuthenticatedUser() {
  const session = cookies().get("privy-token")?.value;

  try {
    if (!session) return;

    const user = await privyClient.verifyAuthToken(session);

    return privyClient.getUser(user.userId);
  } catch (error) {}
}

async function getNewAuthenticaedUser() {
  const identityToken = cookies().get("privy-id-token")?.value;

  if (!identityToken) return;

  try {
    const verificationKey = await jose.importSPKI(
      env.PRIVY_VERIFICATION_KEY,
      "ES256"
    );

    const { payload, protectedHeader } = await jose.jwtVerify(
      identityToken,
      verificationKey,
      {
        issuer: "privy.io",
        audience: env.NEXT_PUBLIC_PRIVY_APP_ID,
      }
    );

    if (payload) {
      let discord:
        | {
            type: "discord_oauth";
            subject: string;
            username: string;
          }
        | undefined;

      let twitter:
        | {
            type: "twitter_oauth";
            subject: string;
            username: string;
          }
        | undefined;

      let farcaster:
        | {
            type: "farcaster";
            fid: number;
            username: string;
          }
        | undefined;

      let wallet:
        | {
            type: "wallet";
            address: string;
            chain_type: string;
            wallet_client_type: string;
          }
        | undefined;

      for (const account of payload.linked_accounts as any) {
        if (account.type === "discord_oauth") {
          discord = account;
        }

        if (account.type === "twitter_oauth") {
          twitter = account;
        }

        if (account.type === "farcaster") {
          farcaster = account;
        }

        if (account.type === "wallet") {
          wallet = account;
        }
      }

      return {
        id: payload.sub,
        discord,
        twitter,
        farcaster,
        wallet,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
