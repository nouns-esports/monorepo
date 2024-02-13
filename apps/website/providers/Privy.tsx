"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Privy(props: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
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
  );
}
