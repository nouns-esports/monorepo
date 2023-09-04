"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createContext } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

const PrimaryColorContext = createContext("#E93737");

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Nouns Esports",
  projectId: "7820259db53692b745d1c7ba9ccf31c9",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Providers(props: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  console.log(segment);

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        appInfo={{
          appName: "Nouns Esports",
        }}
        theme={midnightTheme({
          accentColor: "#E93737",
          overlayBlur: "small",
          borderRadius: "medium",
        })}
        chains={chains}
      >
        <PrimaryColorContext.Provider value="#E93737">
          {props.children}
        </PrimaryColorContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
