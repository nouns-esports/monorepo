"use client";

import { Modal, ToggleModal, useModal } from "@/components/Modal";
import { X } from "lucide-react";
import Link from "../Link";
import {
  CaretDown,
  CaretUp,
  ChartBarHorizontal,
  TwitterLogo,
} from "phosphor-react-sc";
import Markdown from "../lexical/Markdown";
import type { Nexus, Proposal, Round } from "~/packages/db/schema";
import type { roundState } from "@/utils/roundState";
import type { getAuthenticatedUser } from "@/server/queries/users";
import VoteSelector from "../VoteSelector";
import type { getRound } from "@/server/queries/rounds";
import Button from "../Button";

export default function ViewProposalModal(props: {
  round: NonNullable<Awaited<ReturnType<typeof getRound>>> & {
    state: ReturnType<typeof roundState>;
  };
  proposal: Proposal & { user: Nexus };
  user?: NonNullable<Awaited<ReturnType<typeof getAuthenticatedUser>>> & {
    priorVotes: number;
  };
  addVote: (proposal: number, amount: number) => void;
  removeVote: (proposal: number, amount: number) => void;
  selectedVotes: Record<string, number>;
}) {
  const { open: openCastVotesModal } = useModal("cast-votes");
  return (
    <Modal
      id={`view-proposal-${props.proposal.id}`}
      handle
      queryParam={[`p`, props.proposal.id.toString()]}
      className="relative flex-col gap-4 w-2/3 h-2/3 p-4 max-w-screen-lg max-xl:w-full max-xl:h-[95dvh] overflow-hidden"
    >
      <div className="flex gap-4 justify-between">
        <h2 className="text-white font-luckiest-guy text-3xl">
          {props.proposal.title}
        </h2>
        <ToggleModal
          id={`view-proposal-${props.proposal.id}`}
          tabIndex={0}
          className="bg-grey-200 rounded-md p-1 h-min flex items-center justify-center w-min outline-none max-lg:hidden"
        >
          <X className="text-grey-600 w-5 h-5" />
        </ToggleModal>
      </div>
      <div className="flex flex-col h-full overflow-y-scroll custom-scrollbar gap-2">
        {props.round.type === "markdown" ? (
          <Markdown markdown={props.proposal.content ?? ""} readOnly />
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="rounded-full flex items-center text-white gap-3 font-semibold text-xl">
            <img
              src={props.proposal.user.image}
              className="rounded-full h-9 w-9"
            />
            {props.proposal.user.name}
          </div>
          <div className="flex gap-3 items-center">
            {props.proposal.user.twitter ? (
              <Link
                href={`https://twitter.com/${props.proposal.user.twitter.username}`}
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
            {props.proposal.user.farcaster ? (
              <Link
                href={`https://warpcast.com/${props.proposal.user.farcaster.username}`}
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
        </div>
        <VoteSelector
          proposal={props.proposal.id}
          votes={props.proposal.totalVotes}
          selectedVotes={props.selectedVotes[props.proposal.id]}
          userRank={props.user?.rank ?? undefined}
          minRank={props.round.minVoterRank ?? undefined}
          roundState={props.round.state}
          addVote={props.addVote}
          removeVote={props.removeVote}
        />
      </div>
    </Modal>
  );
}
