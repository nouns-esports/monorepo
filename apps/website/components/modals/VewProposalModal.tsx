"use client";

import Modal, { ToggleModal, useModal } from "@/components/Modal.new";
import { X } from "lucide-react";
import { create } from "zustand";
import Link from "../Link";
import { TwitterLogo } from "phosphor-react-sc";
import Markdown from "../lexical/Markdown";
import type { Nexus, Proposal, Round } from "~/packages/db/schema";

export default function ViewProposalModal(props: {
  round: Round;
  proposal: Proposal;
  user: Nexus;
}) {
  return (
    <Modal
      id={`view-proposal-${props.proposal.id}`}
      className="flex-col gap-4 w-2/3 h-2/3 p-6 max-sm:p-3 max-w-screen-lg max-xl:w-full max-xl:h-[95dvh] max-xl:rounded-none overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="rounded-full flex items-center text-white gap-3 font-semibold text-lg">
          <img src={props.user.image} className="rounded-full h-7 w-7" />
          {props.user.name}
        </div>
        <ToggleModal
          id={`view-proposal-${props.proposal.id}`}
          tabIndex={0}
          className="bg-grey-200 rounded-md p-1 flex items-center justify-center w-min outline-none"
        >
          <X className="text-grey-600 w-5 h-5" />
        </ToggleModal>
      </div>
      <div className="flex flex-col h-full overflow-y-scroll scrollbar-hidden gap-2">
        <h2 className="text-white font-luckiest-guy text-3xl">
          {props.proposal.title}
        </h2>
        <div className="flex gap-3 items-center">
          {props.user.twitter ? (
            <Link
              href={`https://twitter.com/${props.user.twitter.username}`}
              newTab
            >
              <TwitterLogo
                className="w-6 h-6 text-white hover:opacity-80 transition-opacity"
                weight="fill"
              />
            </Link>
          ) : (
            ""
          )}
          {props.user.farcaster ? (
            <Link
              href={`https://warpcast.com/${props.user.farcaster.username}`}
              newTab
            >
              <img
                src="/farcaster.svg"
                className="w-5 h-5  hover:opacity-80 transition-opacity"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
        {props.round.type === "markdown" ? (
          <Markdown
            markdown={props.proposal.content ?? ""}
            readOnly
            className="bg-grey-800 rounded-xl p-4 flex flex-col h-fit"
          />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
