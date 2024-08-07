"use client";

import { PrivyProvider, getAccessToken, usePrivy } from "@privy-io/react-auth";
import { env } from "~/env";
import { base, baseSepolia } from "viem/chains";
import { useRouter } from "next/navigation";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export const LoginMethodContext = createContext({
  onlyCoinbaseWallet: false,
  setOnlyCoinbaseWallet: ((value) => {}) as Dispatch<SetStateAction<boolean>>,
});

export default function Privy(props: {
  user?: string;
  children: React.ReactNode;
}) {
  const [onlyCoinbaseWallet, setOnlyCoinbaseWallet] = useState(false);

  return (
    <LoginMethodContext.Provider
      value={{ onlyCoinbaseWallet, setOnlyCoinbaseWallet }}
    >
      <PrivyProvider
        appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          loginMethods: ["discord", "twitter", "wallet", "farcaster", "email"],

          defaultChain:
            env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
          supportedChains: [
            env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
          ],
          appearance: {
            theme: "#040404",
            accentColor: "#E93737",
            logo: "/logo/logo.svg",
            walletList: onlyCoinbaseWallet ? ["coinbase_wallet"] : undefined,
          },
          externalWallets: {
            coinbaseWallet: {
              connectionOptions: "all",
            },
          },
        }}
      >
        <PrivySync>{props.children}</PrivySync>
      </PrivyProvider>
    </LoginMethodContext.Provider>
  );
}

function PrivySync(props: { children: React.ReactNode; user?: string }) {
  const { user, authenticated } = usePrivy();

  const router = useRouter();

  useEffect(() => {
    async function refresh() {
      const token = await getAccessToken();

      if (token) {
        router.refresh();
      }
    }

    if (authenticated && !props.user) {
      refresh();
    }

    const intervalId = setInterval(() => {
      refresh();
    }, 900_000);

    return () => clearInterval(intervalId);
  }, [authenticated, user]);

  return props.children;
}
