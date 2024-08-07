"use client";

import Link from "../Link";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { CaretUp, CaretDown, ChartBarHorizontal } from "phosphor-react-sc";
import Button from "../Button";
import { twMerge } from "tailwind-merge";
import { castVotes } from "@/server/actions/castVotes";
import toast from "react-hot-toast";
import { getProposals } from "@/server/queries/proposals";
import { roundState } from "@/utils/roundState";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { useOptimistic } from "react";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Proposals(props: {
  round: {
    id: string;
    state: ReturnType<typeof roundState>;
    awardCount: number;
  };
  proposals: Array<Awaited<ReturnType<typeof getProposals>>[number]>;
  user?: {
    id: string;
    votes: {
      allocated: number;
      remaining: number;
    };
  };
}) {
  const [remainingVotes, setRemainingVotes] = useOptimistic(
    props.user?.votes.remaining ?? 0
  );

  const [votes, setVotes] = useOptimistic<Record<string, number>>(
    props.proposals.reduce((votes: Record<string, number>, proposal) => {
      votes[proposal.id] = votes[proposal.id] ?? 0 + proposal.totalVotes;
      return votes;
    }, {})
  );

  const [userVotes, setUserVotes] = useState<Record<string, number>>({});

  const votesCast = useMemo(
    () =>
      Object.values(userVotes).reduce(
        (totalVotes: number, currentVotes: number) => totalVotes + currentVotes,
        0
      ),
    [userVotes]
  );

  const userProposal = props.proposals.find(
    (proposal) => proposal.user === props.user?.id
  );

  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const { login } = useLogin({
    onComplete: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full gap-4 max-sm:flex-col max-sm:items-start">
        <h3 className="text-white font-luckiest-guy text-3xl">Proposals</h3>
        <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
          {(() => {
            if (props.round.state === "Proposing") {
              if (!props.user) {
                return (
                  <>
                    <p className="text-white">
                      You must be signed in to propose
                    </p>
                    <Button onClick={() => login()}>Sign In</Button>
                  </>
                );
              }

              if (userProposal) {
                return (
                  <>
                    <p className="text-white">
                      You can edit your proposal until voting starts
                    </p>
                    <Button href={`/rounds/${props.round.id}/create`}>
                      Edit Proposal
                    </Button>
                  </>
                );
              }

              return (
                <Button href={`/rounds/${props.round.id}/create`}>
                  Create Proposal
                </Button>
              );
            }

            if (props.round.state === "Voting") {
              if (!props.user) {
                return (
                  <>
                    <p className="text-white">You must be signed in to vote</p>
                    <Button onClick={() => login()}>Sign In</Button>
                  </>
                );
              }

              if (props.user.votes.allocated < 1) {
                return (
                  <>
                    <p className="text-white">Enter the Nexus to vote</p>
                    <Button href="/nexus">Get Started</Button>
                  </>
                );
              }

              if (
                props.user.votes.allocated > 0 &&
                props.user.votes.remaining < 1
              ) {
                return (
                  <>
                    <p className="text-white">Your votes have been submitted</p>
                    <Button href={`/rounds/${props.round.id}?votes=true`}>
                      Share
                    </Button>
                  </>
                );
              }

              return (
                <>
                  <p className="text-white">
                    {remainingVotes - (loading ? 0 : votesCast)}/
                    {props.user?.votes.allocated} votes remaining
                  </p>
                  <Button
                    disabled={loading || votesCast < 1}
                    onClick={() => {
                      const submit = new Promise((resolve, reject) => {
                        setRemainingVotes(remainingVotes - votesCast);

                        startTransition(async () => {
                          setVotes({
                            ...votes,
                            ...Object.entries(userVotes).reduce(
                              (
                                userVotes: Record<string, number>,
                                [id, count]
                              ) => {
                                userVotes[id] = (votes[id] ?? 0) + count;

                                return userVotes;
                              },
                              {}
                            ),
                          });

                          await castVotes({
                            // @ts-ignore
                            user: props.user.id,
                            round: props.round.id,
                            votes: Object.entries(userVotes).map(
                              ([id, count]) => ({
                                proposal: Number(id),
                                count,
                              })
                            ),
                          })
                            .then(resolve)
                            .catch(reject);
                        });
                      });

                      toast.promise(submit, {
                        loading: "Casting votes",
                        success: () => {
                          setUserVotes({});
                          return "Successfully cast votes";
                        },
                        error: () => {
                          setUserVotes({});
                          return "Failed to cast votes";
                        },
                      });
                    }}
                  >
                    Submit Votes
                  </Button>
                </>
              );
            }

            if (props.round.state === "Ended") {
              if (props.user) {
                for (let i = 0; i < props.round.awardCount; i++) {
                  if (props.proposals[i]?.user === props.user.id) {
                    return (
                      <>
                        <p className="text-white">Your proposal won!</p>
                        <Button href="/nexus">View Rewards</Button>
                      </>
                    );
                  }
                }

                if (
                  props.user.votes.allocated > 0 &&
                  props.user.votes.remaining < 1
                ) {
                  return (
                    <>
                      <p className="text-white">
                        Your votes have been submitted
                      </p>
                      <Button href={`/rounds/${props.round.id}?votes=true`}>
                        Share
                      </Button>
                    </>
                  );
                }
              }
            }
          })()}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {props.proposals
          .toSorted((a, b) => {
            if (props.round.state === "Proposing") {
              if (a.user === props.user?.id && b.user !== props.user?.id) {
                return -1;
              }

              if (b.user === props.user?.id && a.user !== props.user?.id) {
                return 1;
              }
            }

            if (props.round.state === "Voting") {
              if (votes[a.id] > votes[b.id]) {
                return -1;
              }

              if (votes[b.id] > votes[a.id]) {
                return 1;
              }
            }

            return 0;
          })
          .map((proposal, index) => (
            <Link
              key={index}
              href={`/rounds/${props.round.id}?p=${proposal.id}`}
              scroll={false}
              className={twMerge(
                "relative w-full flex gap-4 bg-grey-800 text-grey-200 rounded-xl px-4 pt-4 h-36 overflow-hidden max-sm:flex-col max-sm:p-0 max-sm:h-fit max-sm:gap-0",
                props.round.state === "Ended" &&
                  index < props.round.awardCount &&
                  index === 0 &&
                  "border-[3px] border-gold-500 bg-gold-900 text-white",
                props.round.state === "Ended" &&
                  index < props.round.awardCount &&
                  index === 1 &&
                  "border-[3px] border-silver-500 bg-silver-900 text-white",
                props.round.state === "Ended" &&
                  index < props.round.awardCount &&
                  index === 2 &&
                  "border-[3px] border-bronze-500 bg-bronze-900 text-white",
                props.round.state === "Ended" &&
                  index > 2 &&
                  index < props.round.awardCount &&
                  "border-[3px] border-blue-500 bg-blue-900 text-white"
              )}
            >
              {props.round.state === "Ended" &&
              index < props.round.awardCount ? (
                <div
                  className={twMerge(
                    "absolute -top-0.5 -right-0.5 z-10 rounded-bl-md bg-grey-600 font-bold text-white flex items-center justify-center w-9 max-sm:z-40",
                    index === 0 && "bg-gold-500 text-gold-900",
                    index === 1 && "bg-silver-500 text-silver-900",
                    index === 2 && "bg-bronze-500 text-bronze-900",
                    index > 2 && "bg-blue-500 text-blue-900"
                  )}
                >
                  {numberToOrdinal(index + 1)}
                </div>
              ) : (
                ""
              )}
              {proposal.image ? (
                <img
                  src={`${proposal.image}?img-width=250&img-onerror=redirect`}
                  className="w-40 flex-shrink-0 h-[calc(100%_-_16px)] rounded-xl max-sm:rounded-b-none overflow-hidden z-20 relative group max-sm:w-full max-sm:h-40 object-cover object-center"
                />
              ) : (
                ""
              )}
              <div className="relative w-full flex flex-col gap-1 max-sm:px-3 max-sm:pt-3 max-sm:h-32">
                <h4 className="text-2xl font-bebas-neue text-white">
                  {proposal.title}
                </h4>
                <div className="w-full overflow-hidden h-full">
                  {proposal.description
                    .replaceAll(/<[^>]*>/g, "")
                    .slice(0, 500)}
                </div>
                <div
                  className={twMerge(
                    "absolute left-0 w-full bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0 z-10 hidden max-sm:flex",
                    props.round.state === "Ended" &&
                      index < props.round.awardCount &&
                      index === 0 &&
                      "from-gold-900",
                    props.round.state === "Ended" &&
                      index < props.round.awardCount &&
                      index === 1 &&
                      "from-silver-900",
                    props.round.state === "Ended" &&
                      index < props.round.awardCount &&
                      index === 2 &&
                      "from-bronze-900",
                    props.round.state === "Ended" &&
                      index > 2 &&
                      index < props.round.awardCount &&
                      "from-blue-900"
                  )}
                />
              </div>
              {props.round.state === "Voting" ||
              props.round.state === "Ended" ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="h-full items-center flex gap-4 z-20 relative pb-4 max-sm:h-12 max-sm:w-full max-sm:justify-end max-sm:px-3 max-sm:pb-0 max-sm:border-t-grey-500"
                >
                  <div
                    className={twMerge(
                      "h-full bg-grey-600 w-[1px] max-sm:hidden",
                      props.round.state === "Ended" &&
                        index === 0 &&
                        index < props.round.awardCount &&
                        "bg-gold-500",
                      props.round.state === "Ended" &&
                        index === 1 &&
                        index < props.round.awardCount &&
                        "bg-silver-500",
                      props.round.state === "Ended" &&
                        index === 2 &&
                        index < props.round.awardCount &&
                        "bg-bronze-500",
                      props.round.state === "Ended" &&
                        index > 2 &&
                        index < props.round.awardCount &&
                        "bg-blue-500"
                    )}
                  />
                  <div
                    className={twMerge(
                      "flex flex-col items-center gap-2 w-14 flex-shrink-0 max-sm:flex-row max-sm:w-auto"
                    )}
                  >
                    {proposal.user !== props.user?.id &&
                    props.round.state === "Voting" ? (
                      <CaretUp
                        onClick={() => {
                          if (!props.user) return;

                          if (remainingVotes - votesCast < 1) return;

                          setUserVotes({
                            ...userVotes,
                            [proposal.id]:
                              (userVotes[proposal.id]
                                ? userVotes[proposal.id]
                                : 0) + 1,
                          });
                        }}
                        className="w-5 h-5 text-grey-200 hover:text-white transition-colors"
                        weight="fill"
                      />
                    ) : (
                      ""
                    )}
                    <p
                      className={twMerge(
                        "text-grey-200 text-2xl font-bebas-neue text-center text-nowrap max-sm:mt-1",
                        props.round.state === "Ended" &&
                          index < props.round.awardCount &&
                          "text-white",

                        (props.round.state === "Ended" ||
                          proposal.user === props.user?.id) &&
                          "flex flex-col items-center gap-2.5 max-sm:flex-row"
                      )}
                    >
                      {votes[proposal.id] ?? 0}
                      {!loading && userVotes[proposal.id] ? (
                        <span className="text-white">
                          {" "}
                          + {userVotes[proposal.id]}
                        </span>
                      ) : (
                        ""
                      )}
                      {props.round.state === "Ended" ||
                      (proposal.user === props.user?.id &&
                        props.round.state === "Voting") ? (
                        <ChartBarHorizontal
                          className={twMerge(
                            "w-5 h-5 text-grey-200 -rotate-90",
                            props.round.state === "Ended" &&
                              index < props.round.awardCount &&
                              "text-white"
                          )}
                          weight="fill"
                        />
                      ) : (
                        ""
                      )}
                    </p>
                    {proposal.user !== props.user?.id &&
                    props.round.state === "Voting" ? (
                      <CaretDown
                        onClick={() => {
                          if ((userVotes[proposal.id] ?? 0) < 1) return;
                          setUserVotes({
                            ...userVotes,
                            [proposal.id]: userVotes[proposal.id] - 1,
                          });
                        }}
                        className="w-5 h-5 text-grey-200 hover:text-white transition-colors"
                        weight="fill"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div
                className={twMerge(
                  "absolute left-0 w-full bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0 z-10 max-sm:hidden",
                  props.round.state === "Ended" &&
                    index < props.round.awardCount &&
                    index === 0 &&
                    "from-gold-900",
                  props.round.state === "Ended" &&
                    index < props.round.awardCount &&
                    index === 1 &&
                    "from-silver-900",
                  props.round.state === "Ended" &&
                    index < props.round.awardCount &&
                    index === 2 &&
                    "from-bronze-900",
                  props.round.state === "Ended" &&
                    index > 2 &&
                    index < props.round.awardCount &&
                    "from-blue-900"
                )}
              />
            </Link>
          ))}
        {props.proposals.length < 1 ? (
          <div className="mt-4 flex gap-4 justify-center items-center">
            <img src="/fire-sticker.png" alt="" className="h-32" />
            <p className="text-grey-200 text-lg max-w-80">
              There are no proposals yet.{" "}
              {props.round.state === "Proposing"
                ? "Be the first to propose?"
                : ""}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
