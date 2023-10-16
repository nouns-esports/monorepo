"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  Locale,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createContext, useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { Game } from "@/db/schema";

export const PrimaryColorContext = createContext<string>("#E93737");

const { chains, publicClient } = configureChains(
  [mainnet, optimism, base, zora],
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

export default function Providers(props: {
  children: React.ReactNode;
  games: Game[];
}) {
  const pathname = usePathname();

  const { locale } = useParams();

  const color = useMemo(() => {
    if (pathname.includes("/games")) {
      const game = props.games.find(
        (_game) => _game.id === pathname.split("/")[locale === "en" ? 2 : 3]
      );

      if (game) return game?.color;
    }

    return "#E93737";
  }, [pathname]);

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        locale={locale as Locale}
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
        <PrimaryColorContext.Provider value={color}>
          {props.children}
        </PrimaryColorContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
