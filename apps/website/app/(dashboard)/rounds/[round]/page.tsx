import Countdown from "@/components/rounds/Countdown";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import AwardScroller from "@/components/rounds/AwardScroller";
import Proposals from "@/components/proposals/Proposals";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getRound } from "@/server/queries/rounds";
import { getProposals } from "@/server/queries/proposals";
import { getPriorVotes } from "@/server/queries/votes";
import { roundState } from "@/utils/roundState";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { getAuthenticatedUser, getUser } from "@/server/queries/users";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";
import { getNexus } from "@/server/queries/nexus";
import { environmentToProtocol } from "@/utils/environmentToProtocol";
import { env } from "~/env";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer className="min-h-96" />,
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
    description: round.description,
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
      `${environmentToProtocol()}/frames/round/${props.params.round}`
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

  const nexus = user ? await getNexus({ user }) : undefined;

  const priorVotes = user
    ? await getPriorVotes({ user, round: props.params.round })
    : 0;

  const proposalsWithUser = await Promise.all(
    proposals.map(async (proposal) => {
      const user = await getUser({ id: proposal.user });

      return {
        ...proposal,
        user: user ?? { id: proposal.user },
      };
    })
  );

  return (
    <div className="flex flex-col gap-4">
      <Link href="/rounds" className="text-red flex items-center gap-1 group">
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-grey-800 rounded-xl overflow-hidden">
            <img
              src={round.banner}
              className="w-full h-48 object-cover object-center max-sm:h-32"
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="w-full text-white font-luckiest-guy text-3xl">
                {round.name}
              </h2>
              <div className="flex flex-col gap-2">
                <Markdown markdown={round.content} readOnly />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full h-fit max-md:flex-col">
            <div className="flex gap-4 max-md:w-full">
              <div className="flex flex-col gap-2 items-center justify-center bg-grey-800 rounded-xl overflow-hidden min-w-36 p-4 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                <p className="text-sm whitespace-nowrap text-grey-200">
                  {state === "Starting" ? "Round starts" : ""}
                  {state === "Proposing" ? "Voting starts" : ""}
                  {state === "Voting" ? "Round ends" : ""}
                  {state === "Ended" ? "Round ended" : ""}
                </p>
                <p className="text-white whitespace-nowrap">
                  {state !== "Ended" ? (
                    <Countdown
                      date={
                        state === "Starting"
                          ? new Date(round.start)
                          : state === "Proposing"
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
              {state === "Proposing" || state === "Voting" ? (
                <div className="flex flex-col gap-2 items-center justify-center h-full bg-grey-800 rounded-xl overflow-hidden w-36 flex-shrink-0 max-md:w-full max-md:flex-shrink">
                  <p className="text-sm whitespace-nowrap text-grey-200">
                    Round Status
                  </p>
                  <div className="flex items-center justify-center">
                    <div
                      className={twMerge(
                        "flex text-center text-white font-semibold text-xs rounded-full leading-none px-3 py-2",
                        state === "Proposing" && "bg-blue-700",
                        state === "Voting" && "bg-purple"
                      )}
                    >
                      {state}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-6 items-center justify-center h-full bg-grey-800 rounded-xl overflow-hidden w-full p-4 pt-5">
              <div className="flex flex-col gap-2 items-center pl-4 pr-2">
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-sm whitespace-nowrap text-grey-200">
                    Awards
                  </p>
                  <p className="text-white whitespace-nowrap">
                    {round.awards.length} winner
                    {round.awards.length === 1 ? "" : "s"}
                  </p>
                </div>
                {round.awards.length > 1 ? <AwardScroller /> : ""}
              </div>
              <div className="bg-grey-600 h-full w-[1px]" />
              <div
                id="awards"
                className="w-full flex gap-4 overflow-x-scroll scrollbar-hidden pt-3 -mt-3 scroll-smooth"
              >
                {round.awards.map((award, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center flex-shrink-0 gap-2 border-grey-600 border rounded-xl p-2 px-4"
                  >
                    <img
                      src={award.asset.image}
                      className="w-7 h-7 rounded-md object-cover object-center"
                    />
                    <p className="text-white whitespace-nowrap text-sm">
                      {award.asset.decimals
                        ? formatUnits(BigInt(award.value), award.asset.decimals)
                        : award.value}
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <Proposals
          proposals={proposalsWithUser}
          round={{
            id: props.params.round,
            awardCount: round.awards.length,
            state,
          }}
          user={
            user
              ? {
                  id: user,
                  votes: nexus
                    ? {
                        remaining: nexus.votes - priorVotes,
                        allocated: nexus.votes,
                      }
                    : { remaining: 0, allocated: 0 },
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
