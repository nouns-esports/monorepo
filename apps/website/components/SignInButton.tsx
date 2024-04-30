"use client";

import Text from "@/components/Text";
import { useAccount } from "@/providers/Privy";
import { useRouter, useParams } from "next/navigation";
import Loading from "./Loading";

export default function SignInButton() {
  const { address, connected, farcaster, id, login, logout } = useAccount();

  const router = useRouter();
  const params = useParams();

  return (
    <button
      onClick={() => {
        if (connected) router.push(`/${params.locale}/profile`);
        else login();
      }}
      style={{
        paddingTop: connected ? "6px" : "10px",
        paddingBottom: connected ? "6px" : "10px",
        paddingLeft: connected ? "6px" : "16px",
        paddingRight: connected ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {connected ? (
        <>
          <img
            src={
              farcaster?.pfp ??
              `https://api.cloudnouns.com/v1/pfp?text=${address}`
            }
            alt={`${address}'s avatar`}
            className="rounded-full w-7 h-7 select-none object-center object-cover"
            draggable={false}
          />
          {farcaster?.username ?? "Profile"}
        </>
      ) : false ? (
        <div className="pt-[3px]">
          <Loading />
        </div>
      ) : (
        <Text en="Sign in" pt="Entrar" />
      )}
    </button>
  );
}
