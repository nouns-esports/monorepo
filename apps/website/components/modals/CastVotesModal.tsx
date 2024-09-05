"use client";

import type { Nexus, Proposal } from "~/packages/db/schema";
import Modal, { ToggleModal, useModal } from "../Modal.new";
import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import Button from "../Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pinImage } from "@/server/mutations/pinImage";
import { useAction } from "next-safe-action/hooks";
import { updateProfile } from "@/server/mutations/updateProfile";
import { useRouter } from "next/navigation";
import { Check, Plus, RefreshCcw, Save, UserPen, Vote, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { castVotes } from "@/server/mutations/castVotes";
import { confetti } from "@tsparticles/confetti";

export default function CastVotesModal(props: {
  proposals: Array<
    Proposal & {
      user: Nexus;
    }
  >;
  selectedVotes: Record<string, number>;
}) {
  const { close } = useModal("cast-votes");

  const { isPending, execute } = useAction(castVotes, {
    onSuccess: () => {
      close();
    },
  });

  return (
    <Modal id="cast-votes" className="p-4 flex flex-col min-w-80 gap-6">
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl font-bebas-neue leading-none">
          You are voting for
        </p>
        <button
          onClick={close}
          className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
        >
          <X className="w-4 h-4 text-grey-200" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {Object.entries(props.selectedVotes).map(([proposalId, voteCount]) => {
          const proposal = props.proposals.find(
            (proposal) => proposal.id === Number(proposalId)
          );

          if (!proposal) return null;
          return (
            <div
              key={proposal.id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  src={proposal.user.image}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-white text-lg font-bebas-neue leading-none">
                  {proposal.user.name}
                </p>
              </div>
              <p className="text-lg text-white">+ {voteCount}</p>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          //   const duration = 15 * 1000,
          //     animationEnd = Date.now() + duration,
          //     defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
          //   function randomInRange(min: number, max: number) {
          //     return Math.random() * (max - min) + min;
          //   }
          //   const interval = setInterval(function () {
          //     const timeLeft = animationEnd - Date.now();
          //     if (timeLeft <= 0) {
          //       return clearInterval(interval);
          //     }
          //     const particleCount = 50 * (timeLeft / duration);
          //     // since particles fall down, start a bit higher than random
          //     confetti(
          //       Object.assign({}, defaults, {
          //         particleCount,
          //         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          //       })
          //     );
          //     confetti(
          //       Object.assign({}, defaults, {
          //         particleCount,
          //         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          //       })
          //     );
          //   }, 250);
        }}
        className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
      >
        Confirm
      </button>
    </Modal>
  );
}
