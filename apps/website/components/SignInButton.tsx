"use client";

import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { usePrivy } from "@privy-io/react-auth";
import { userToProfile } from "@/utils/userToProfile";
import type { User } from "@privy-io/server-auth";

export default function SignInButton(props: { user?: User }) {
  const { login, authenticated } = usePrivy();

  const router = useRouter();

  const profile = props.user ? userToProfile(props.user) : undefined;

  return (
    <button
      onClick={() => {
        if (authenticated) router.push("/nexus");
        else login();
      }}
      style={{
        paddingTop: profile ? "6px" : "10px",
        paddingBottom: profile ? "6px" : "10px",
        paddingLeft: profile ? "6px" : "16px",
        paddingRight: profile ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {props.user ? (
        profile ? (
          <>
            <img
              src={profile.pfp}
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
            {profile.name}
          </>
        ) : (
          "Enter the Nexus"
        )
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
