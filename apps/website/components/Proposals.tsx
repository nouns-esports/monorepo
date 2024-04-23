"use client";

import Link from "./Link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { CaretUp, CaretDown, CaretLeft, CaretRight } from "phosphor-react-sc";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { usePrivy } from "@privy-io/react-auth";
import { useAction } from "next-safe-action/hooks";
import { castVotes } from "@/server/actions/castVotes";
import toast from "react-hot-toast";

export default function Proposals(props: {
  round: string;
  proposals: {
    id: string;
    title: string;
    markdown: ReactNode;
    images: string[];
    user: string;
    votes: number;
  }[];
  status: "voting" | "proposing" | "starting" | "ended";
}) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const votesCast = useMemo(
    () =>
      Object.values(votes).reduce(
        (totalVotes: number, currentVotes: number) => totalVotes + currentVotes,
        0
      ),
    [votes]
  );

  const { user } = usePrivy();

  const yourProposal = props.proposals.find(
    (proposal) => proposal.user === user?.id
  );

  const { execute, status } = useAction(castVotes, {
    onSuccess: () => {
      // Do something
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to cast votes");
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full gap-4">
        <h3 className="text-white font-luckiest-guy text-3xl">Proposals</h3>
        <div className="flex gap-4 items-center">
          {props.status === "proposing" && yourProposal ? (
            <p className="text-white">
              You can edit your proposal until voting starts
            </p>
          ) : props.status === "voting" ? (
            <p className="text-white">
              {10 - votesCast}
              /10 votes remaining
            </p>
          ) : (
            ""
          )}
          {props.status === "proposing" ? (
            yourProposal ? (
              <Button href={`/rounds/${props.round}/create`} animate="bg">
                Edit Proposal
              </Button>
            ) : (
              <Button href={`/rounds/${props.round}/create`} animate="bg">
                Create Proposal
              </Button>
            )
          ) : (
            ""
          )}
          {props.status === "voting" ? (
            <Button
              disabled={votesCast < 1 || !user}
              onClick={() => {
                if (!user) return;

                execute({
                  user: user?.id,
                  round: props.round,
                  votes: Object.entries(votes).map(([id, count]) => ({
                    proposal: Number(id),
                    count,
                  })),
                });
              }}
              animate="bg"
            >
              Submit Votes
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {props.proposals
          .toSorted((a, b) => {
            if (a.user === user?.id && b.user !== user?.id) {
              return -1;
            } else if (b.user === user?.id && a.user !== user?.id) {
              return 1;
            }

            if (a.votes > 0 || b.votes > 0) {
              return b.votes - a.votes;
            }

            return Number(a.id) - Number(b.id);
          })
          .map((proposal, index) => {
            const [imageIndex, setImageIndex] = useState(0);

            return (
              <div key={index} className="flex flex-col gap-4">
                <Link
                  href={`/rounds/${props.round}/proposals/${proposal.id}`}
                  className={twMerge(
                    "relative w-full flex gap-4 bg-darkgrey rounded-xl px-4 pt-4 h-36 overflow-hidden"
                    // props.status === "ended" &&
                    // index === 0 && "border-[3px] border-gold-500",
                    // index === 1 && "border-[3px] border-silver-500",
                    // index === 2 && "border-[3px] border-bronze-500"
                  )}
                >
                  {proposal.images.length > 0 ? (
                    <div className="w-40 flex-shrink-0 h-[calc(100%_-_16px)] rounded-xl overflow-hidden z-20 relative group">
                      <div className="w-full top-0 absolute h-full flex items-center px-2 z-30">
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setImageIndex(
                              imageIndex === proposal.images.length - 1
                                ? 0
                                : imageIndex + 1
                            );
                            return false;
                          }}
                          className="flex items-center w-full h-full"
                        >
                          <CaretLeft
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                            weight="bold"
                          />
                        </div>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setImageIndex(
                              imageIndex === 0
                                ? proposal.images.length - 1
                                : imageIndex - 1
                            );
                          }}
                          className="flex items-center justify-end w-full h-full"
                        >
                          <CaretRight
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                            weight="bold"
                          />
                        </div>
                      </div>
                      <img
                        key={imageIndex}
                        src={proposal.images[imageIndex]}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="bg-black w-full h-full absolute top-0 opacity-0 group-hover:opacity-30 transition-opacity" />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-full flex flex-col">
                    <h4 className="text-2xl font-bebas-neue text-white">
                      {proposal.title}
                    </h4>
                    <div className="w-full overflow-hidden h-full">
                      {proposal.markdown}
                    </div>
                  </div>
                  {props.status === "voting" ? (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="h-full items-center flex gap-4 z-20 relative pb-4"
                    >
                      <div className="h-full bg-grey w-[1px]" />
                      <div className="flex flex-col items-center gap-2 w-14 flex-shrink-0">
                        <CaretUp
                          onClick={() => {
                            if (proposal.user === user?.id) return;
                            if (votesCast > 9) return;
                            setVotes({
                              ...votes,
                              [proposal.id]:
                                (votes[proposal.id] ? votes[proposal.id] : 0) +
                                1,
                            });
                          }}
                          className={twMerge(
                            "w-5 h-5 text-lightgrey",
                            proposal.user === user?.id
                              ? "pointer-events-none"
                              : "hover:text-white transition-colors"
                          )}
                          weight="fill"
                        />
                        <p className="text-lightgrey text-2xl font-bebas-neue text-center text-nowrap">
                          {proposal.votes}

                          {votes[proposal.id] ? (
                            <span className="text-white">
                              {" "}
                              + {votes[proposal.id]}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                        <CaretDown
                          onClick={() => {
                            if (proposal.user === user?.id) return;
                            if (
                              (votes[proposal.id] ? votes[proposal.id] : 0) < 1
                            )
                              return;
                            setVotes({
                              ...votes,
                              [proposal.id]: votes[proposal.id] - 1,
                            });
                          }}
                          className={twMerge(
                            "w-5 h-5 text-lightgrey",
                            proposal.user === user?.id
                              ? "pointer-events-none"
                              : "hover:text-white transition-colors"
                          )}
                          weight="fill"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="absolute left-0 w-full bg-gradient-to-t from-darkgrey to-transparent h-10 bottom-0 z-10" />
                </Link>
                {proposal.user === user?.id ? (
                  <div className="w-[calc(100%_-_128px)] h-[1px] bg-grey mx-16 my-2" />
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
