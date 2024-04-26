import Countdown from "@/components/Countdown";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, LinkSimple, Share, ShareFat } from "phosphor-react-sc";
import AwardScroller from "@/components/AwardScroller";
import Proposals from "@/components/Proposals";
import Markdown from "@/components/Mardown";
import { Vote, tokenList } from "@/db/schema";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getRound } from "@/server/queries/rounds";
import { getAwards } from "@/server/queries/awards";
import { getProposals } from "@/server/queries/proposals";
import { getUser } from "@/server/queries/users";

export async function generateMetadata(props: {
  params: { round: string };
}): Promise<Metadata> {
  return {
    other: await getFrameMetadata(
      `http://localhost:3000/frames/round/${props.params.round}`
    ),
  };
}

export default async function Round(props: { params: { round: string } }) {
  const [round, awards, proposals] = await Promise.all([
    getRound({ id: props.params.round }),
    getAwards({ round: props.params.round }),
    getProposals({ round: props.params.round }),
  ]);

  if (!round) {
    return notFound();
  }

  const now = new Date().getTime();

  const roundStart = new Date(round.start).getTime();
  const votingStart = new Date(round.votingStart).getTime();
  const roundEnd = new Date(round.end ?? Infinity).getTime();

  const status =
    now < roundStart
      ? "starting"
      : now < votingStart
        ? "proposing"
        : now < roundEnd
          ? "voting"
          : "ended";

  const tokens: Record<string, number> = {};

  for (const award of awards) {
    const [eip115, chainId, address, tokenId] = award.type.split(":");

    tokens[address] = (tokens[address] ?? 0) + Number(award.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href={"/rounds"} className="text-red flex items-center gap-1 group">
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-darkgrey rounded-xl overflow-hidden">
            <img
              src={round.image}
              className="w-full h-48 object-cover object-center max-sm:h-32"
            />
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center w-full justify-between">
                <h2 className="w-full text-white font-luckiest-guy text-3xl">
                  {round.name}
                </h2>
                <LinkSimple className="w-5 h-5 text-red" />
              </div>
              <div className="flex flex-col gap-2">
                <Markdown markdown={round.description} style />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full h-fit max-md:flex-col">
            <div className="flex gap-4 max-md:w-full">
              <div className="flex flex-col gap-2 items-center justify-center bg-darkgrey rounded-xl overflow-hidden min-w-36 p-4 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                <p className="text-sm whitespace-nowrap">
                  {status === "starting" ? "Round starts" : ""}
                  {status === "proposing" ? "Proposing ends" : ""}
                  {status === "voting" ? "Round ends" : ""}
                  {status === "ended" ? "Round ended" : ""}
                </p>
                <p className="text-white whitespace-nowrap">
                  {now < roundEnd ? (
                    <Countdown
                      date={
                        status === "starting"
                          ? new Date(round.start)
                          : status === "proposing"
                            ? new Date(round.votingStart)
                            : new Date(round.end ?? Infinity)
                      }
                    />
                  ) : (
                    new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(round.end ?? Infinity))
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center h-full bg-darkgrey rounded-xl overflow-hidden w-36 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                <p className="text-sm whitespace-nowrap">Total prizes</p>
                {Object.entries(tokens).map(([address, value], index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center text-white"
                  >
                    <img src={tokenList[address].image} className="w-4 h-4" />
                    {formatUnits(BigInt(value), tokenList[address].decimals)}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-6 items-center justify-center h-full bg-darkgrey rounded-xl overflow-hidden w-full p-4 pt-5">
              <div className="flex flex-col gap-2 items-center pl-4 pr-2">
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-sm whitespace-nowrap">Awards</p>
                  <p className="text-white whitespace-nowrap">
                    {awards.length} winner{awards.length === 1 ? "" : "s"}
                  </p>
                </div>
                <AwardScroller />
              </div>
              <div className="bg-grey h-full w-[1px]" />
              <div
                id="awards"
                className="w-full flex gap-4 overflow-x-scroll scrollbar-hidden pt-3 -mt-3 scroll-smooth"
              >
                {awards
                  .toSorted((a, b) => a.place - b.place)
                  .map((award, index) => {
                    const [eip115, chainId, address, tokenId] =
                      award.type.split(":");

                    const token = tokenList[address];

                    return (
                      <div
                        key={index}
                        className="relative flex flex-col items-center flex-shrink-0 gap-2 border-grey border rounded-xl p-2 px-4"
                      >
                        <img
                          src={token.image}
                          className="w-7 h-7 rounded-full object-cover object-center"
                        />
                        <p className="text-white whitespace-nowrap text-sm">
                          {formatUnits(BigInt(award.value), token.decimals)}
                        </p>
                        <div
                          className={twMerge(
                            "absolute -top-3 -right-3 rounded-full bg-grey font-bold text-white text-xs flex items-center justify-center w-7 h-7",
                            index === 0 && "bg-gold-500 text-gold-900",
                            index === 1 && "bg-silver-500 text-silver-900",
                            index === 2 && "bg-bronze-500 text-bronze-900"
                          )}
                        >
                          {award.place}
                          {award.place % 10 === 0 && "th"}
                          {award.place % 10 === 1 && "st"}
                          {award.place % 10 === 2 && "nd"}
                          {award.place % 10 === 3 && "rd"}
                          {award.place % 10 > 3 && "th"}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Proposals
          proposals={await Promise.all(
            proposals.map(async (proposal) => {
              return {
                id: proposal.id.toString(),
                title: proposal.title,
                markdown: <Markdown markdown={proposal.description} />,
                images: (
                  proposal.description.match(/src="http[^"]*"/g) ?? []
                ).map((image) => image.replace('src="', "").replace('"', "")),
                user: await getUser({ id: proposal.user }),
                votes:
                  proposal.votes?.reduce(
                    (totalVotes: number, currentVote: Vote) =>
                      totalVotes + currentVote.count,
                    0
                  ) ?? 0,
              };
            })
          )}
          round={props.params.round}
          status={status}
        />
      </div>
    </div>
  );
}
