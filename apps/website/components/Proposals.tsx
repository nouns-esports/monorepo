"use client";

import Link from "./Link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { CaretUp, CaretDown, CaretLeft, CaretRight } from "phosphor-react-sc";
import Button from "./Button";

export default function Proposals(props: {
  round: string;
  proposals: {
    id: string;
    title: string;
    markdown: ReactNode;
    images: string[];
    votes: number;
  }[];
  status: "voting" | "proposing" | "starting" | "ended";
}) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const votesRemaining = useMemo(
    () =>
      10 -
      Object.values(votes).reduce(
        (totalVotes: number, currentVotes: number) => totalVotes + currentVotes,
        0
      ),
    [votes]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full gap-4">
        <h3 className="text-white font-luckiest-guy text-3xl">Proposals</h3>
        <div className="flex gap-4 items-center">
          {props.status === "voting" ? (
            <p className="text-white">
              {votesRemaining}
              /10 votes remaining
            </p>
          ) : (
            ""
          )}
          {props.status === "voting" ? (
            <Button
              onClick={() => {
                // Submit votes
              }}
              animate="bg"
            >
              Submit Votes
            </Button>
          ) : (
            <Button href={`/rounds/${props.round}/create`} animate="bg">
              Create Proposal
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {props.proposals.map((proposal) => {
          const [index, setIndex] = useState(0);

          return (
            <Link
              href={`/rounds/${props.round}/proposals/${proposal.id}`}
              className="relative w-full flex gap-4 bg-darkgrey rounded-xl px-4 pt-4 h-36 overflow-hidden"
            >
              <div className="w-40 flex-shrink-0 h-[calc(100%_-_16px)] rounded-xl overflow-hidden z-20 relative group">
                <div className="w-full top-0 absolute h-full flex items-center px-2 z-30">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIndex(
                        index === proposal.images.length - 1 ? 0 : index + 1
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
                      setIndex(
                        index === 0 ? proposal.images.length - 1 : index - 1
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
                  key={index}
                  src={proposal.images[index]}
                  className="w-full h-full object-cover object-center"
                />
                <div className="bg-black w-full h-full absolute top-0 opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
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
                  <div className="flex flex-col gap-2 mx-4">
                    <CaretUp
                      onClick={() => {
                        if (votesRemaining < 1) return;
                        setVotes({
                          ...votes,
                          [proposal.id]:
                            (votes[proposal.id] ? votes[proposal.id] : 0) + 1,
                        });
                      }}
                      className="w-5 h-5 text-lightgrey hover:text-white transition-colors"
                      weight="fill"
                    />
                    <p className="text-lightgrey text-2xl font-bebas-neue text-center">
                      {proposal.votes +
                        (votes[proposal.id] ? votes[proposal.id] : 0)}
                    </p>
                    <CaretDown
                      onClick={() => {
                        if ((votes[proposal.id] ? votes[proposal.id] : 0) < 1)
                          return;
                        setVotes({
                          ...votes,
                          [proposal.id]: votes[proposal.id] - 1,
                        });
                      }}
                      className="w-5 h-5 text-lightgrey hover:text-white transition-colors"
                      weight="fill"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="absolute left-0 w-full bg-gradient-to-t from-darkgrey to-transparent h-10 bottom-0 z-10" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
