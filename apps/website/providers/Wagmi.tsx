"use client";

import { base, baseSepolia } from "wagmi/chains";
import { http, createConfig, WagmiProvider } from "wagmi";

export const config = createConfig({
  chains: [process.env.NODE_ENV === "development" ? baseSepolia : base],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export default function Wagmi(props: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{props.children}</WagmiProvider>;
}
