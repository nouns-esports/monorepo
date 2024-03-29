"use client";

import { createContext, useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { Game } from "@/db/schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { PrivyProvider } from "@privy-io/react-auth";

export const PrimaryColorContext = createContext<string>("#E93737");

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrimaryColorContext.Provider value={color}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
            onSuccess={(user) => {
              console.log(`User ${user.id} logged in!`);
            }}
            config={{
              loginMethods: ["wallet"],
              appearance: {
                theme: "dark",
                accentColor: "#E93737",
                logo: "/logo.svg",
              },
            }}
          >
            {props.children}
          </PrivyProvider>
        </PrimaryColorContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
