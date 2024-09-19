"use client";

import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Modal } from "./Modal";
import type { getAuthenticatedUser } from "@/server/queries/users";
import Button from "./Button";
import { useAction } from "next-safe-action/hooks";
import { createNexus } from "@/server/mutations/createNexus";
import { ArrowRight, Mail, User } from "lucide-react";

import { DiscordLogo, TwitterLogo, Wallet } from "phosphor-react-sc";
import { useModal } from "./Modal";
import SignInModal from "./modals/SignInModal";

export default function SignInButton(props: {
  privyUser?: string;
  user?: Awaited<ReturnType<typeof getAuthenticatedUser>>;
}) {
  const { authenticated, user } = usePrivy();
  const { login } = useLogin({
    onComplete(user, isNewUser) {
      if (isNewUser) {
        open();
      }
    },
  });

  const router = useRouter();

  const createNexusAction = useAction(createNexus);

  const { open } = useModal("sign-in");

  return (
    <>
      <button
        onClick={() => {
          if (props.user) return router.push(`/users/${props.user.handle}`);
          if (props.privyUser) return open();
          else login();
        }}
        style={{
          paddingTop: props.user?.image ? "6px" : "10px",
          paddingBottom: props.user?.image ? "6px" : "10px",
          paddingLeft: props.user?.image ? "6px" : "16px",
          paddingRight: props.user?.image ? "14px" : "16px",
        }}
        className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
      >
        {props.user ? (
          <>
            <img
              src={props.user.image}
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
            {props.user.name}
          </>
        ) : props.privyUser ? (
          "Create Profile"
        ) : (
          "Sign in"
        )}
      </button>
      <SignInModal />
    </>
  );
}
