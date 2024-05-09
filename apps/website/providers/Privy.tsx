"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { env } from "@/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { base, baseSepolia } from "viem/chains";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export default function Privy(props: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ["discord", "twitter", "email", "wallet", "farcaster"],
        defaultChain:
          env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
        supportedChains: [
          env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
        ],
        appearance: {
          theme: "#040404",
          accentColor: "#E93737",
          logo: "/logo/logo.svg",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{props.children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
