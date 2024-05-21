"use client";

import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useLogin, usePrivy } from "@privy-io/react-auth";

export default function SignInButton() {
  const { authenticated, user, logout, ready } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod) => {
      if (isNewUser && loginMethod !== "farcaster") {
        router.push("/profile");
      }
    },
  });

  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (authenticated) router.push("/profile");
        else login();
      }}
      style={{
        paddingTop: authenticated && user?.farcaster ? "6px" : "10px",
        paddingBottom: authenticated && user?.farcaster ? "6px" : "10px",
        paddingLeft: authenticated && user?.farcaster ? "6px" : "16px",
        paddingRight: authenticated && user?.farcaster ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {authenticated ? (
        <>
          {user?.farcaster ? (
            <img
              src={
                user.farcaster.pfp ??
                `https://api.cloudnouns.com/v1/pfp?text=${user?.id}`
              }
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
          ) : (
            ""
          )}
          {user?.farcaster?.username ?? "Create Profile"}
        </>
      ) : false ? (
        <div className="pt-[3px]">
          <Loading />
        </div>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
