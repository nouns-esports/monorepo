"use client";

import { WagmiProvider } from "@privy-io/wagmi";
import { env } from "@/env";
import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { base, baseSepolia } from "viem/chains";

const wagmiConfig = createConfig({
  chains: [env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export default function Privy(props: { children: React.ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>{props.children}</WagmiProvider>;
}
