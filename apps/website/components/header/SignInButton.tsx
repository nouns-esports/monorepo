"use client";

import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { User } from "@privy-io/server-auth";

export default function SignInButton(props: { user?: User }) {
  const { authenticated } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod) => {
      if (isNewUser && loginMethod !== "farcaster") {
        router.push("/profile");
      }
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (authenticated && !props.user) {
      router.refresh();
    }
  }, [authenticated]);

  return (
    <button
      onClick={() => {
        if (authenticated) router.push("/profile");
        else login();
      }}
      style={{
        paddingTop: props.user?.farcaster?.pfp ? "6px" : "10px",
        paddingBottom: props.user?.farcaster?.pfp ? "6px" : "10px",
        paddingLeft: props.user?.farcaster?.pfp ? "6px" : "16px",
        paddingRight: props.user?.farcaster?.pfp ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {props.user ? (
        <>
          <img
            src={
              props.user?.farcaster?.pfp ??
              `https://api.cloudnouns.com/v1/pfp?text=${props.user.id}`
            }
            alt="User avatar"
            className="rounded-full w-7 h-7 select-none object-center object-cover"
            draggable={false}
          />
          {props.user?.farcaster?.username ?? "Create Profile"}
        </>
      ) : authenticated ? (
        <div className="pt-[3px]">
          <Loading />
        </div>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
