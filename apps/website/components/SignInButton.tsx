"use client";

import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { usePrivy } from "@privy-io/react-auth";
import { Modal, toggleModal } from "./Modal";
import type { getAuthenticatedUser } from "@/server/queries/users";
import { defaultProfileImage } from "@/utils/defaultProfileImage";
import Button from "./Button";
import { useAction } from "next-safe-action/hooks";
import { createNexus } from "@/server/mutations/createNexus";

export default function SignInButton(props: {
  privyUser?: string;
  user?: Awaited<ReturnType<typeof getAuthenticatedUser>>;
}) {
  const { login, authenticated, user } = usePrivy();

  const router = useRouter();

  const createNexusAction = useAction(createNexus);

  return (
    <>
      <button
        onClick={() => {
          if (props.user) router.push("/nexus");
          else toggleModal("sign-in");
        }}
        style={{
          paddingTop: props.user?.discord ? "6px" : "10px",
          paddingBottom: props.user?.discord ? "6px" : "10px",
          paddingLeft: props.user?.discord ? "6px" : "16px",
          paddingRight: props.user?.discord ? "14px" : "16px",
        }}
        className="flex items-center gap-2 select-none text-grey-800 py-1.5 pl-1.5 pr-3.5 text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
      >
        {props.user ? (
          <>
            <img
              src={props.user.image ?? defaultProfileImage(props.user.id)}
              alt="User avatar"
              className="rounded-full w-7 h-7 select-none object-center object-cover"
              draggable={false}
            />
            {props.user.name}
          </>
        ) : (
          "Sign in"
        )}
      </button>
      {!props.user ? (
        <Modal
          id="sign-in"
          className="w-[450px] h-[600px] rounded-2xl bg-black border border-grey-600 max-sm:h-[100dvh] max-sm:w-full text-grey-200"
        >
          <div className="flex flex-col w-full h-full gap-8">
            {!props.privyUser ? (
              <div className="flex flex-col gap-4 h-full">
                <div className="relative flex items-center justify-center flex-shrink-0 h-48 bg-grey-600 w-full">
                  Graphic
                  <div className="absolute bottom-0 left-0 from-black to-transparent bg-gradient-to-t w-full h-16" />
                </div>
                <div className="flex flex-col gap-4 px-6">
                  <div className="text-3xl font-cabin font-semibold text-white">
                    Help us shape the future of esports
                  </div>
                  Get Started / I have an account
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 h-full p-6">
                <div className="text-3xl font-bebas-neue text-white">
                  Create Profile
                </div>
              </div>
            )}
            <div className="flex items-center justify-between pl-8 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-red rounded-full h-3 w-6"></div>
                <div className="bg-grey-400 rounded-full h-3 w-3"></div>
                <div className="bg-grey-400 rounded-full h-3 w-3"></div>
              </div>
              <Button
                loading={createNexusAction.isPending}
                onClick={() =>
                  createNexusAction.execute({
                    name: "Sam",
                  })
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
