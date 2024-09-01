import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, TwitterLogo } from "phosphor-react-sc";
import Proposals from "@/components/proposals/Proposals";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { getFrameMetadata, isFrameRequest } from "frog/next";
import type { Metadata } from "next";
import { getRound, getRoundStats } from "@/server/queries/rounds";
import { getPriorVotes } from "@/server/queries/votes";
import { roundState } from "@/utils/roundState";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { getAuthenticatedUser } from "@/server/queries/users";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";
import { getNexus } from "@/server/queries/nexus";
import { env } from "~/env";
import { ArrowRight, Check, Timer, X } from "lucide-react";
import { headers } from "next/headers";
import { Modal, ToggleModal } from "@/components/Modal";
import DateComponent from "@/components/Date";
import ViewProposalModal from "@/components/modals/VewProposalModal";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer className="h-full" />,
});

export async function generateMetadata(props: {
  params: { round: string };
}): Promise<Metadata> {
  const round = await getRound({ id: props.params.round });

  if (!round) {
    return notFound();
  }

  return {
    title: round.name,
    metadataBase: new URL(env.PUBLIC_DOMAIN),
    openGraph: {
      type: "website",
      images: [round.banner],
    },
    twitter: {
      site: "@NounsEsports",
      card: "summary_large_image",
      images: [round.banner],
    },
    other: await getFrameMetadata(
      `${env.PUBLIC_DOMAIN}/api/frames/rounds/${props.params.round}`
    ),
  };
}

export default async function Round(props: {
  params: { round: string };
  searchParams: { p?: string };
}) {
  if (isFrameRequest(headers())) return null;

  const [round, stats] = await Promise.all([
    getRound({ id: props.params.round }),
    getRoundStats({ id: props.params.round }),
  ]);

  if (!round) {
    return notFound();
  }

  const state = roundState({
    start: round.start,
    votingStart: round.votingStart,
    end: round.end,
  });

  const user = await getAuthenticatedUser();

  const nexus = user ? await getNexus({ user: user.id }) : undefined;

  const priorVotes = user
    ? await getPriorVotes({
        user: user.id,
        wallet: user.wallet?.address,
        round: props.params.round,
      })
    : 0;

  const selectedProposal = props.searchParams.p
    ? round.proposals.find(
        (proposal) => proposal.id === Number(props.searchParams.p)
      )
    : undefined;

  return (
    <div className="relative flex flex-col justify-center gap-4 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <Link href="/rounds" className="text-red flex items-center gap-1 group">
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 h-[500px] max-lg:flex-col max-lg:h-auto">
          <div className="bg-grey-800 flex flex-col w-full h-full rounded-xl overflow-hidden max-lg:max-h-[600px] max-sm:max-h-[500px]">
            <img
              src={`${round.image}?img-height=500&img-onerror=redirect`}
              className="w-full h-48 object-cover object-center max-sm:h-32"
            />
            <div className="flex flex-col h-full gap-2 max-sm:gap-4 p-4 min-h-0">
              <div className="flex gap-4 items-start justify-between max-sm:flex-col">
                <h1 className="w-full text-white font-luckiest-guy text-3xl max-xl:text-2xl">
                  {round.name}
                </h1>
                <Link
                  href={`https://warpcast.com/~/channel/${round.community.id}`}
                  newTab
                  className="bg-grey-500 hover:bg-grey-400 transition-colors py-2 pl-2 pr-3 flex-shrink-0 rounded-full flex text-white items-center gap-2 text-sm font-semibold w-fit whitespace-nowrap"
                >
                  <img
                    src={round.community.image}
                    className="w-5 h-5 rounded-full"
                  />
                  {round.community.name}
                </Link>
              </div>
              <Markdown
                markdown={round.content}
                readOnly
                className="overflow-y-auto h-full custom-scrollbar"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex gap-4 h-full min-h-0 w-full">
              <div className="bg-grey-800 w-full h-full rounded-xl flex flex-col gap-4 p-4">
                <h2 className="font-bebas-neue text-2xl text-white">Awards</h2>
                <div className="flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar">
                  {round.awards.map((award, index) => (
                    <div
                      key={award.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={award.asset.image}
                          className="w-7 h-7 rounded-md object-cover object-center"
                        />
                        <p className="text-white whitespace-nowrap text-sm">
                          {award.asset.decimals
                            ? formatUnits(
                                BigInt(award.value),
                                award.asset.decimals
                              )
                            : award.value}{" "}
                          {award.asset.name}
                        </p>
                      </div>
                      <div
                        className={twMerge(
                          "rounded-md bg-grey-600 font-bold text-white text-xs flex items-center justify-center w-[30px] py-0.5",
                          index === 0 && "bg-gold-500 text-gold-900",
                          index === 1 && "bg-silver-500 text-silver-900",
                          index === 2 && "bg-bronze-500 text-bronze-900",
                          index > 2 && "bg-blue-500 text-blue-900"
                        )}
                      >
                        {numberToOrdinal(award.place)}
                      </div>
                    </div>
                  ))}
                </div>
                <p>
                  {round.awards.length}{" "}
                  {round.awards.length > 1 ? "winners" : "winner"}
                </p>
              </div>
              <div className="bg-grey-800 w-full h-full rounded-xl flex flex-col p-4 gap-4 max-xl:hidden">
                <h2 className="font-bebas-neue text-2xl text-white">Stats</h2>
                <div className="flex flex-col gap-2 h-full">
                  <div className="flex w-full justify-between items-center">
                    <p className="">Proposals Created</p>
                    <p className="text-white">{stats.proposalsCreated}</p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className="">Votes Cast</p>
                    <p className="text-white">{stats.votesCast}</p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className="">Total Participants</p>
                    <p className="text-white">{stats.totalParticipants}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p>Last updated on</p>
                  <p className="text-white whitespace-nowrap">
                    <DateComponent />
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-grey-800 w-full gap-2 rounded-xl flex flex-col flex-shrink-0 py-4 px-5 justify-between">
              <div className="flex items-center w-full">
                <p className="text-white w-full">
                  {state === "Upcoming" ? "Round Starts" : "Round Started"}
                </p>
                <p className="text-white w-full text-center">
                  {state === "Upcoming" || state === "Proposing"
                    ? "Voting Starts"
                    : "Voting Started"}
                </p>
                <p className="text-white w-full text-right">
                  {state === "Ended" ? "Round Ended" : "Round Ends"}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                {state === "Upcoming" ? <Active /> : <Completed />}
                <div
                  className={twMerge(
                    "w-full",
                    state === "Upcoming"
                      ? "border-2 border-dotted border-grey-500"
                      : "h-1 bg-green"
                  )}
                />
                {state === "Upcoming" ? (
                  <Upcoming />
                ) : state === "Proposing" ? (
                  <Active />
                ) : (
                  <Completed />
                )}
                <div
                  className={twMerge(
                    "w-full",
                    state === "Voting" || state === "Ended"
                      ? "h-1 bg-green"
                      : "border-2 border-dotted border-grey-500"
                  )}
                />
                {state === "Ended" ? <Completed /> : <Upcoming />}
              </div>
              <div className="flex items-center w-full">
                <p className="w-full whitespace-nowrap">
                  <DateComponent timestamp={round.start} />
                </p>
                <p className="w-full text-center whitespace-nowrap">
                  <DateComponent timestamp={round.votingStart} />
                </p>
                <p className="w-full text-right whitespace-nowrap">
                  <DateComponent timestamp={round.end ?? Infinity} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <Proposals
          round={{
            ...round,
            awardCount: round.awards.length,
            state: "Ended",
          }}
          user={
            nexus
              ? {
                  ...nexus,
                  priorVotes,
                }
              : undefined
          }
        />
      </div>
      {round.proposals.map((proposal) => (
        <ViewProposalModal
          key={proposal.id}
          round={round}
          proposal={proposal}
          user={proposal.user}
        />
      ))}
      {/* {priorVotes > 0 ? (
        <Modal id="share-votes" className="overflow-hidden flex-col gap-4 p-4">
          <div className="relative z-[80] rounded-xl bg-black overflow-hidden flex flex-col gap-4 p-4">
            <img
              src={`/api/frames/rounds/${props.params.round}/votes/${user?.id}/img`}
              className="w-96 rounded-xl"
            />
            <div className="flex justify-between text-white">
              <Link
                href={`https://warpcast.com/~/compose?embeds[]=${env.PUBLIC_DOMAIN}/api/frames/rounds/${props.params.round}/votes/${user?.id}/`}
                className="flex gap-1 items-center group hover:opacity-80 transition-opacity"
              >
                Share this image on Warpcast{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <ToggleModal id="share-votes" className="text-red">
                Close
              </ToggleModal>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )} */}
    </div>
  );
}

function Completed() {
  return (
    <div className="rounded-full flex items-center justify-center h-8 w-8 bg-green flex-shrink-0 ">
      <Check className="h-4 w-4 text-white" />
    </div>
  );
}

function Active() {
  return (
    <div className="rounded-full bg-blue-700 flex items-center justify-center h-8 w-8 flex-shrink-0">
      <Timer className="h-4 w-4 text-white" />
    </div>
  );
}

function Upcoming() {
  return (
    <div className="rounded-full border-2 border-grey-500 border-dotted h-8 w-8 flex-shrink-0" />
  );
}
