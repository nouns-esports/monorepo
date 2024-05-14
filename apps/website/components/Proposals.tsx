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
import { User } from "@/server/queries/users";

export default function Proposals(props: {
  round: string;
  proposals: {
    id: string;
    title: string;
    markdown: string;
    images: string[];
    user: User;
    votes: number;
  }[];
  status: "voting" | "proposing" | "starting" | "ended";
  awardCount: number;
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
    (proposal) => proposal?.user.id === user?.id
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
              <Button
                href={`/rounds/${props.round}/create`}
                animate="bg"
                scroll={false}
              >
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
            if (a.user.id === user?.id && b.user.id !== user?.id) {
              return -1;
            } else if (b.user.id === user?.id && a.user.id !== user?.id) {
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
              <div key={index} className="relative flex flex-col gap-4">
                {props.status === "ended" && index < props.awardCount ? (
                  <div
                    className={twMerge(
                      "absolute -top-2 -left-2 z-10 rounded-md bg-grey-600 font-bold text-white flex items-center justify-center w-9",
                      index === 0 && "bg-gold-500 text-gold-900",
                      index === 1 && "bg-silver-500 text-silver-900",
                      index === 2 && "bg-bronze-500 text-bronze-900",
                      index > 2 && "bg-blue-500 text-blue-900"
                    )}
                  >
                    {index + 1}
                    {index + (1 % 10) === 0 && "th"}
                    {index + (1 % 10) === 1 && "st"}
                    {index + (1 % 10) === 2 && "nd"}
                    {index + (1 % 10) === 3 && "rd"}
                    {index + (1 % 10) > 3 && "th"}
                  </div>
                ) : (
                  ""
                )}
                <Link
                  href={`/rounds/${props.round}/proposals/${proposal.id}`}
                  className={twMerge(
                    "relative w-full flex gap-4 bg-grey-800 rounded-xl px-4 pt-4 h-36 overflow-hidden",
                    props.status === "ended" &&
                      index < props.awardCount &&
                      index === 0 &&
                      "border-[3px] border-gold-500 bg-gold-900 text-white",
                    props.status === "ended" &&
                      index < props.awardCount &&
                      index === 1 &&
                      "border-[3px] border-silver-500 bg-silver-900 text-white",
                    props.status === "ended" &&
                      index < props.awardCount &&
                      index === 2 &&
                      "border-[3px] border-bronze-500 bg-bronze-900 text-white",
                    props.status === "ended" &&
                      index > 2 &&
                      index < props.awardCount &&
                      "border-[3px] border-blue-500 bg-blue-900 text-white"
                  )}
                >
                  {proposal.images.length > 0 ? (
                    <div className="w-40 flex-shrink-0 h-[calc(100%_-_16px)] rounded-xl overflow-hidden z-20 relative group">
                      {proposal.images.length > 1 ? (
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
                      ) : (
                        ""
                      )}
                      <img
                        key={imageIndex}
                        src={`${proposal.images[imageIndex]}?img-width=250`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div
                        className={twMerge(
                          "bg-black w-full h-full absolute top-0 opacity-0",
                          proposal.images.length > 1 &&
                            "group-hover:opacity-30 transition-opacity"
                        )}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-full flex flex-col gap-1">
                    <h4 className="text-2xl font-bebas-neue text-white">
                      {proposal.title}
                    </h4>
                    {proposal.user.name && proposal.user.pfp ? (
                      <div className="flex gap-2 items-center hover:bg-grey-600 pl-1 py-0.5 pr-2 -ml-1 -mt-1 rounded-full w-fit">
                        <img
                          src={proposal.user.pfp}
                          className="w-5 h-5 rounded-full"
                        />
                        <p className="text-white">{proposal.user.name}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="w-full overflow-hidden h-full">
                      {proposal.markdown
                        .replaceAll(/<[^>]*>/g, "")
                        .slice(0, 500)}
                    </div>
                  </div>
                  {props.status === "voting" || props.status === "ended" ? (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="h-full items-center flex gap-4 z-20 relative pb-4"
                    >
                      <div
                        className={twMerge(
                          "h-full bg-grey-600 w-[1px]",
                          props.status === "ended" &&
                            index === 0 &&
                            index < props.awardCount &&
                            "bg-gold-500",
                          props.status === "ended" &&
                            index === 1 &&
                            index < props.awardCount &&
                            "bg-silver-500",
                          props.status === "ended" &&
                            index === 2 &&
                            index < props.awardCount &&
                            "bg-bronze-500",
                          props.status === "ended" &&
                            index > 2 &&
                            index < props.awardCount &&
                            "bg-blue-500"
                        )}
                      />
                      <div className="flex flex-col items-center gap-2 w-14 flex-shrink-0">
                        <CaretUp
                          onClick={() => {
                            if (props.status !== "voting") return;
                            if (proposal.user?.id === user?.id) return;
                            if (votesCast > 9) return;
                            setVotes({
                              ...votes,
                              [proposal.id]:
                                (votes[proposal.id] ? votes[proposal.id] : 0) +
                                1,
                            });
                          }}
                          className={twMerge(
                            "w-5 h-5 text-grey-200",
                            proposal.user?.id === user?.id
                              ? "pointer-events-none"
                              : "hover:text-white transition-colors",
                            props.status === "ended" && "cursor-not-allowed",
                            props.status === "ended" &&
                              index < props.awardCount &&
                              "text-white"
                          )}
                          weight="fill"
                        />
                        <p
                          className={twMerge(
                            "text-grey-200 text-2xl font-bebas-neue text-center text-nowrap",
                            props.status === "ended" &&
                              index < props.awardCount &&
                              "text-white"
                          )}
                        >
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
                            if (props.status !== "voting") return;
                            if (proposal.user?.id === user?.id) return;
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
                            "w-5 h-5 text-grey-200",
                            proposal.user?.id === user?.id
                              ? "pointer-events-none"
                              : "hover:text-white transition-colors",
                            props.status === "ended" && "cursor-not-allowed",
                            props.status === "ended" &&
                              index < props.awardCount &&
                              "text-white"
                          )}
                          weight="fill"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={twMerge(
                      "absolute left-0 w-full bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0 z-10",
                      props.status === "ended" &&
                        index < props.awardCount &&
                        index === 0 &&
                        "from-gold-900",
                      props.status === "ended" &&
                        index < props.awardCount &&
                        index === 1 &&
                        "from-silver-900",
                      props.status === "ended" &&
                        index < props.awardCount &&
                        index === 2 &&
                        "from-bronze-900",
                      props.status === "ended" &&
                        index > 2 &&
                        index < props.awardCount &&
                        "from-blue-900"
                    )}
                  />
                </Link>
                {props.proposals.length > 1 &&
                proposal.user?.id === user?.id ? (
                  <div className="w-[calc(100%_-_128px)] h-[1px] bg-grey-600 mx-16 my-2" />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        {props.proposals.length < 1 ? (
          <div className="mt-4 flex gap-4 justify-center items-center">
            <img src="/fire-sticker.png" alt="" className="h-32" />
            <p className="text-grey-200 text-lg max-w-80">
              There are no proposals yet.{" "}
              {props.status === "proposing" ? "Be the first to propose?" : ""}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
