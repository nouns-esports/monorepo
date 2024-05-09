"use client";

import Text from "@/components/Text";
import { useRouter, useParams } from "next/navigation";
import Loading from "./Loading";
import { usePrivy } from "@privy-io/react-auth";

export default function SignInButton() {
  const { authenticated, user, login, logout } = usePrivy();

  const router = useRouter();
  const params = useParams();

  return (
    <button
      onClick={() => {
        if (authenticated) router.push(`/${params.locale}/profile`);
        else login();
      }}
      style={{
        paddingTop: authenticated ? "6px" : "10px",
        paddingBottom: authenticated ? "6px" : "10px",
        paddingLeft: authenticated ? "6px" : "16px",
        paddingRight: authenticated ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {authenticated ? (
        <>
          <img
            src={
              user?.farcaster?.pfp ??
              `https://api.cloudnouns.com/v1/pfp?text=${user?.id}`
            }
            alt="User avatar"
            className="rounded-full w-7 h-7 select-none object-center object-cover"
            draggable={false}
          />
          {user?.farcaster?.username ?? "Profile"}
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
