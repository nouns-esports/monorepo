import Countdown from "@/components/rounds/Countdown";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import AwardScroller from "@/components/rounds/AwardScroller";
import CastVotes from "@/components/proposals/CastVotes";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getRound } from "@/server/queries/rounds";
import { getProposals } from "@/server/queries/proposals";
import { getUserVotes } from "@/server/queries/votes";
import { roundState } from "@/utils/roundState";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { awardTypeToToken } from "@/utils/awardTypeToToken";
import { mergeAwards } from "@/utils/mergeAwards";
import { getAuthenticatedUser } from "@/server/queries/users";
import { canClaimAward } from "@/server/queries/awards";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer />,
});

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
  const [round, proposals] = await Promise.all([
    getRound({ id: props.params.round }),
    getProposals({ round: props.params.round }),
  ]);

  if (!round) {
    return notFound();
  }

  const state = roundState(round);

  const user = await getAuthenticatedUser();

  const userState = user
    ? {
        id: user,
        canClaimAward: await canClaimAward({ user, round: props.params.round }),
        votes: await getUserVotes({
          round: props.params.round,
          user,
        }),
      }
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <Link href={"/rounds"} className="text-red flex items-center gap-1 group">
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-grey-800 rounded-xl overflow-hidden">
            <img
              src={round.image}
              className="w-full h-48 object-cover object-center max-sm:h-32"
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="w-full text-white font-luckiest-guy text-3xl">
                {round.name}
              </h2>
              <div className="flex flex-col gap-2 min-h-96">
                <Markdown markdown={round.content} readOnly />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full h-fit max-md:flex-col">
            <div className="flex gap-4 max-md:w-full">
              <div className="flex flex-col gap-2 items-center justify-center bg-grey-800 rounded-xl overflow-hidden min-w-36 p-4 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                <p className="text-sm whitespace-nowrap">
                  {state === "starting" ? "Round starts" : ""}
                  {state === "proposing" ? "Proposing ends" : ""}
                  {state === "voting" ? "Round ends" : ""}
                  {state === "ended" ? "Round ended" : ""}
                </p>
                <p className="text-white whitespace-nowrap">
                  {state !== "ended" ? (
                    <Countdown
                      date={
                        state === "starting"
                          ? new Date(round.start)
                          : state === "proposing"
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
              <div className="flex flex-col gap-2 items-center justify-center h-full bg-grey-800 rounded-xl overflow-hidden w-36 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                <p className="text-sm whitespace-nowrap">Total prizes</p>
                {mergeAwards(round.awards).map(
                  ({ totalValue, token }, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center text-white"
                    >
                      <img
                        src={token.image}
                        className="w-4 h-4 rounded-[4px]"
                      />
                      {formatUnits(BigInt(totalValue), token.decimals)}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex gap-6 items-center justify-center h-full bg-grey-800 rounded-xl overflow-hidden w-full p-4 pt-5">
              <div className="flex flex-col gap-2 items-center pl-4 pr-2">
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-sm whitespace-nowrap">Awards</p>
                  <p className="text-white whitespace-nowrap">
                    {round.awards.length} winner
                    {round.awards.length === 1 ? "" : "s"}
                  </p>
                </div>
                <AwardScroller />
              </div>
              <div className="bg-grey-600 h-full w-[1px]" />
              <div
                id="awards"
                className="w-full flex gap-4 overflow-x-scroll scrollbar-hidden pt-3 -mt-3 scroll-smooth"
              >
                {round.awards.map((award, index) => {
                  const { decimals, image } = awardTypeToToken(award.type);

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-center flex-shrink-0 gap-2 border-grey-600 border rounded-xl p-2 px-4"
                    >
                      <img
                        src={image}
                        className="w-7 h-7 rounded-md object-cover object-center"
                      />
                      <p className="text-white whitespace-nowrap text-sm">
                        {formatUnits(BigInt(award.value), decimals)}
                      </p>
                      <div
                        className={twMerge(
                          "absolute -top-3 -right-3 rounded-md bg-grey-600 font-bold text-white text-xs flex items-center justify-center w-[30px] py-0.5",
                          index === 0 && "bg-gold-500 text-gold-900",
                          index === 1 && "bg-silver-500 text-silver-900",
                          index === 2 && "bg-bronze-500 text-bronze-900",
                          index > 2 && "bg-blue-500 text-blue-900"
                        )}
                      >
                        {numberToOrdinal(award.place)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <CastVotes
          proposals={proposals}
          round={{
            id: props.params.round,
            awardCount: round.awards.length,
            state,
          }}
          user={userState}
        />
      </div>
    </div>
  );
}
