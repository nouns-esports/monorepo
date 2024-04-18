import { query } from "@/app/api/query/server";
import Button from "@/components/Button";
import Countdown from "@/components/Countdown";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import AwardScroller from "@/components/AwardScroller";
import Proposals from "@/components/Proposals";
import Markdown from "@/components/Mardown";
import { Vote } from "@/db/schema";

export default async function Round(props: { params: { round: string } }) {
  const [round, awards, proposals] = await Promise.all([
    query.getRound({ id: props.params.round }),
    query.getAwards({ round: props.params.round }),
    query.getProposals({ round: props.params.round }),
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

  return (
    <div className="flex flex-col gap-4">
      <Link href={"/rounds"} className="text-red flex items-center gap-1">
        <ArrowLeft className="w-5 h-5 text-red" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-darkgrey rounded-xl overflow-hidden">
            <img
              src={round.image}
              className="w-full h-48 object-cover object-center"
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="w-full text-white font-luckiest-guy text-3xl">
                {round.name}
              </h2>
              <div className="flex flex-col gap-2">
                <Markdown markdown={round.description} style />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full h-fit">
            <div className="flex flex-col gap-2 items-center justify-center bg-darkgrey rounded-xl overflow-hidden min-w-36 p-4 flex-shrink-0">
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
            <div className="flex flex-col gap-2 items-center justify-center h-full bg-darkgrey rounded-xl overflow-hidden w-36 flex-shrink-0">
              <p className="text-sm whitespace-nowrap">Total prizes</p>
              <p className="text-white whitespace-nowrap">$1,000</p>
            </div>
            <div className="flex gap-6 items-center justify-center h-full bg-darkgrey rounded-xl overflow-hidden w-full p-4 pt-5">
              <div className="flex flex-col gap-2 items-center pl-4 pr-2">
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-sm whitespace-nowrap">Awards</p>
                  <p className="text-white whitespace-nowrap">5 winners</p>
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
                  .map((award, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4"
                    >
                      <img
                        src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                        className="w-7 h-7"
                      />
                      <p className="text-white whitespace-nowrap text-sm">
                        {award.value}
                      </p>
                      <div className="absolute -top-3 -right-3 rounded-full bg-grey text-white text-xs flex items-center justify-center w-7 h-7">
                        {award.place}
                      </div>
                    </div>
                  ))}
                <div className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                    className="w-7 h-7"
                  />
                  <p className="text-white whitespace-nowrap text-sm">500</p>
                  <div className="absolute -top-3 -right-3 rounded-full bg-yellow text-white text-xs flex items-center justify-center w-7 h-7">
                    1st
                  </div>
                </div>
                <div className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                    className="w-7 h-7"
                  />
                  <p className="text-white whitespace-nowrap text-sm">500</p>
                  <div className="absolute -top-3 -right-3 rounded-full bg-lightgrey text-white text-xs flex items-center justify-center w-7 h-7">
                    2nd
                  </div>
                </div>
                <div className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                    className="w-7 h-7"
                  />
                  <p className="text-white whitespace-nowrap text-sm">500</p>
                  <div className="absolute -top-3 -right-3 rounded-full bg-grey text-white text-xs flex items-center justify-center w-7 h-7">
                    3rd
                  </div>
                </div>
                <div className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                    className="w-7 h-7"
                  />
                  <p className="text-white whitespace-nowrap text-sm">500</p>
                  <div className="absolute -top-3 -right-3 rounded-full bg-grey text-white text-xs flex items-center justify-center w-7 h-7">
                    3rd
                  </div>
                </div>
                <div className="relative flex flex-col items-center gap-2 border-grey border rounded-xl p-2 px-4">
                  <img
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                    className="w-7 h-7"
                  />
                  <p className="text-white whitespace-nowrap text-sm">500</p>
                  <div className="absolute -top-3 -right-3 rounded-full bg-grey text-white text-xs flex items-center justify-center w-7 h-7">
                    3rd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Proposals
          proposals={proposals.map((proposal) => {
            return {
              id: proposal.id.toString(),
              title: proposal.title,
              markdown: <Markdown markdown={proposal.description} />,
              images: (
                proposal.description.match(/src="http[^"]*"/g) ?? []
              ).map((image) => image.replace('src="', "").replace('"', "")),
              votes:
                proposal.votes?.reduce(
                  (totalVotes: number, currentVote: Vote) =>
                    totalVotes + currentVote.count,
                  0
                ) ?? 0,
            };
          })}
          round={props.params.round}
          status={status}
        />
      </div>
    </div>
  );
}
