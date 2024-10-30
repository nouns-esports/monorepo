"use client";

import {
  PrivyProvider,
  getAccessToken,
  usePrivy,
  type PrivyClientConfig,
  type WalletListEntry,
} from "@privy-io/react-auth";
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
import { create } from "zustand";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

export const LoginMethodContext = createContext({
  onlyCoinbaseWallet: false,
  setOnlyCoinbaseWallet: ((value) => {}) as Dispatch<SetStateAction<boolean>>,
});

export const usePrivyModalState = create<{
  loginMethods?: PrivyClientConfig["loginMethods"];
  walletList?: WalletListEntry[];
  set: (
    state: Partial<{
      loginMethods: PrivyClientConfig["loginMethods"];
      walletList: WalletListEntry[];
    }>
  ) => void;
}>((set) => ({
  loginMethods: ["discord", "twitter", "wallet", "farcaster", "email"],
  walletList: undefined,
  set,
}));

export default function Privy(props: {
  user?: string;
  children: React.ReactNode;
}) {
  const { loginMethods, walletList } = usePrivyModalState();
  const [onlyCoinbaseWallet, setOnlyCoinbaseWallet] = useState(false);

  return (
    <LoginMethodContext.Provider
      value={{ onlyCoinbaseWallet, setOnlyCoinbaseWallet }}
    >
      <PrivyProvider
        appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          loginMethods,
          defaultChain:
            env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
          supportedChains: [
            env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
          ],
          appearance: {
            theme: "#040404",
            accentColor: "#E93737",
            logo: "/logo/logo.svg",
            walletList,
          },
          externalWallets: {
            coinbaseWallet: {
              connectionOptions: "all",
            },
          },
        }}
      >
        <PrivySync>
          <SmartWalletsProvider>{props.children}</SmartWalletsProvider>
        </PrivySync>
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
