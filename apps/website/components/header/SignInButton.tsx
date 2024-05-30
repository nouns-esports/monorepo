"use client";

import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { usePrivy } from "@privy-io/react-auth";
import { getUserProfile } from "@/server/queries/users";

export default function SignInButton(props: {
  user?: { id: string; profile?: Awaited<ReturnType<typeof getUserProfile>> };
}) {
  const { login, authenticated } = usePrivy();

  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (authenticated) router.push("/nexus");
        else login();
      }}
      style={{
        paddingTop: props.user?.profile ? "6px" : "10px",
        paddingBottom: props.user?.profile ? "6px" : "10px",
        paddingLeft: props.user?.profile ? "6px" : "16px",
        paddingRight: props.user?.profile ? "14px" : "16px",
      }}
      className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      {props.user ? (
        props.user.profile ? (
          <>
            <img
              src={props.user.profile.pfp}
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
            {props.user?.profile.name}
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
