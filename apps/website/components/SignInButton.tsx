"use client";

import { useRouter } from "next/navigation";
import type { AuthenticatedUser } from "@/server/queries/users";
import { useModal } from "./Modal";
import SignInModal from "./modals/SignInModal";

export default function SignInButton(props: { user?: AuthenticatedUser }) {
  const router = useRouter();
  const { open } = useModal("sign-in");

  return (
    <>
      <button
        onClick={() => {
          if (props.user?.nexus) {
            return router.push(
              `/users/${props.user.nexus.discord ?? props.user.id}`
            );
          }

          open();
        }}
        style={{
          paddingTop: props.user?.nexus?.image ? "6px" : "10px",
          paddingBottom: props.user?.nexus?.image ? "6px" : "10px",
          paddingLeft: props.user?.nexus?.image ? "6px" : "16px",
          paddingRight: props.user?.nexus?.image ? "14px" : "16px",
        }}
        className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
      >
        {props.user?.nexus ? (
          <>
            <img
              src={props.user.nexus.image}
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
            {props.user.nexus.name}
          </>
        ) : (
          "Sign in"
        )}
      </button>
      <SignInModal user={props.user} />
    </>
  );
}
