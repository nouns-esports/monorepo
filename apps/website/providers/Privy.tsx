"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { env } from "@/env";
import { base, baseSepolia } from "viem/chains";
// import { useEffect } from "react";
// import { identify } from "@multibase/js"

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
      {props.children}
    </PrivyProvider>
  );
}
