"use client";

import { PrivyProvider, getAccessToken, usePrivy } from "@privy-io/react-auth";
import { env } from "@/env";
import { base, baseSepolia } from "viem/chains";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { identify } from "@multibase/js"

export default function Privy(props: {
  user?: string;
  children: React.ReactNode;
}) {
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
      <PrivySync>{props.children}</PrivySync>
    </PrivyProvider>
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
  }, [authenticated, user]);

  return props.children;
}
