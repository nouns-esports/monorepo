"use client";

import { usePrivy } from "@privy-io/react-auth";
import Text from "@/components/Text";
import { useSmartAccount } from "@/providers/Privy";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInButton() {
  const { login, logout } = usePrivy();

  const { address, connected, user } = useSmartAccount();

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <button
      onClick={() => {
        if (connected)
          logout(); //router.push(`/${params.locale}/dashboard/profile`);
        else login();
      }}
      style={{
        paddingTop: connected ? "6px" : "10px",
        paddingBottom: connected ? "6px" : "10px",
        paddingLeft: connected ? "6px" : "16px",
        paddingRight: connected ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-darkgrey py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {connected ? (
        <>
          <img
            src={
              user?.privy.farcaster?.pfp ??
              `https://api.cloudnouns.com/v1/pfp?text=${address}`
            }
            alt={`${address}'s avatar`}
            className="rounded-full w-7 h-7 select-none object-center object-cover"
            draggable={false}
          />
          {user?.id ?? `${address?.slice(0, 5)}...${address?.slice(-3)}`}
        </>
      ) : (
        <Text en="Sign in" pt="Entrar" />
      )}
    </button>
  );
}
