"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers(props: { children: React.ReactNode }) {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [publicProvider()]
  );

  // const { connectors } = getDefaultWallets({
  //   appName: "Nouns Esports",
  //   projectId: "7820259db53692b745d1c7ba9ccf31c9",
  //   chains,
  // });

  // const config = createConfig({
  //   autoConnect: true,
  //   connectors,
  //   publicClient,
  // });

  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <WagmiConfig config={config}> */}
      {/* <RainbowKitProvider chains={chains}> */}
      {props.children}
      {/* </RainbowKitProvider> */}
      {/* </WagmiConfig> */}
    </QueryClientProvider>
  );
}
