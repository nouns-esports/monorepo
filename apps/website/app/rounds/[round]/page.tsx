import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import Proposals from "@/components/proposals/Proposals";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { getFrameMetadata, isFrameRequest } from "frog/next";
import type { Metadata } from "next";
import { getRound, getRoundStats } from "@/server/queries/rounds";
import { getPriorVotes } from "@/server/queries/votes";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { getAuthenticatedUser } from "@/server/queries/users";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";
import { env } from "~/env";
import { headers } from "next/headers";
import DateComponent from "@/components/Date";
import RoundTimeline from "@/components/RoundTimeline";
import Countup from "@/components/Countup";
import type { ReactNode } from "react";
import { Gavel, Megaphone, TicketCheck } from "lucide-react";

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
		description: null,
		metadataBase: new URL(env.NEXT_PUBLIC_DOMAIN),
		openGraph: {
			type: "website",
			images: [round.image],
		},
		twitter: {
			site: "@NounsEsports",
			card: "summary_large_image",
			images: [round.image],
		},
		other: await getFrameMetadata(
			`${env.NEXT_PUBLIC_DOMAIN}/api/frames/rounds/${props.params.round}`,
		),
	};
}

export default async function Round(props: {
	params: { round: string };
	searchParams: { p?: string };
}) {
	if (isFrameRequest(headers())) return null;

	const [user, round] = await Promise.all([
		getAuthenticatedUser(),
		getRound({ id: props.params.round }),
	]);

	if (!round) {
		return notFound();
	}

	const priorVotes = user
		? await getPriorVotes({
				user: user.id,
				wallet: user.wallet?.address,
				round: props.params.round,
			})
		: 0;

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
									href={`https://warpcast.com/~/channel/${round.community?.id ?? "nouns-esports"}`}
									newTab
									className="bg-grey-500 hover:bg-grey-400 transition-colors py-2 pl-2 pr-3 flex-shrink-0 rounded-full flex text-white items-center gap-2 text-sm font-semibold w-fit whitespace-nowrap"
								>
									<img
										src={round.community?.image ?? "/logo/logo-square.png"}
										className="w-5 h-5 rounded-full"
									/>
									{round.community?.name ?? "Nouns Esports"}
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
							<div className="bg-grey-800 w-full h-full max-lg:max-h-80 rounded-xl flex flex-col gap-4 p-4">
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
													title={award.asset.name}
													className="w-7 h-7 rounded-md object-cover object-center"
												/>
												<p className="text-white whitespace-nowrap text-sm">
													{award.asset.decimals
														? formatUnits(
																BigInt(award.value),
																award.asset.decimals,
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
													index > 2 && "bg-blue-500 text-blue-900",
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
								<div className="flex items-center justify-between">
									<h2 className="font-bebas-neue text-2xl text-white">
										Activity
									</h2>
									<select className="bg-grey-500 text-white rounded-full px-2 py-1 outline-none cursor-pointer">
										<option>All</option>
										<option>Proposals</option>
										<option>Votes</option>
										<option>Comments</option>
									</select>
								</div>
								<div className="flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar">
									{(
										[
											{
												type: "round-start",
												timestamp: new Date(round.start),
												icon: (
													<div className="bg-green p-1 w-5 h-5 text-white rounded-md">
														<Megaphone className="w-full h-full" />
													</div>
												),
												user: undefined,
												caption: undefined,
											},
											{
												type: "voting-start",
												timestamp: new Date(round.votingStart),
												icon: (
													<div className="bg-purple p-1 w-5 h-5 text-white rounded-md">
														<TicketCheck className="w-full h-full" />
													</div>
												),
												user: undefined,
												caption: undefined,
											},
											{
												type: "round-end",
												timestamp: new Date(round.end ?? Infinity),
												icon: (
													<div className="bg-red p-1 w-5 h-5 text-white rounded-md">
														<Gavel className="w-full h-full" />
													</div>
												),
												user: undefined,
												caption: undefined,
											},
											// {
											// 	type: "comment",
											// 	timestamp: new Date("2024-10-07T05:00:00"),
											// 	icon: "https://ipfs.nouns.gg/ipfs/Qmd66SPyEt4uZko5uezgajmoS1K575RJS2bQxh4KehzmcD",
											// 	user: "Sam",
											// 	caption:
											// 		"This round is pretty cool, you guys should go check it out and also vote.",
											// },
											...round.proposals
												.filter((proposal) => proposal.user)
												.map((proposal) => ({
													type: "proposal",
													timestamp: new Date(proposal.createdAt),
													icon: undefined,
													user: {
														id: proposal.user.username ?? proposal.user.id,
														name: proposal.user.name,
														image: proposal.user.image,
													},
													caption: undefined,
												})),
											...round.votes
												.filter((vote) => vote.user)
												.map((vote) => ({
													type: "vote",
													timestamp: new Date(vote.timestamp),
													icon: undefined,
													user: {
														id: vote.user.username ?? vote.user.id,
														name: vote.user.name,
														image: vote.user.image,
													},
													caption: undefined,
												})),
										] satisfies Array<{
											type: string;
											timestamp: Date;
											icon?: ReactNode;
											user?: {
												id: string;
												name: string;
												image: string;
											};
											caption?: string;
										}>
									)
										.filter((event) => event.timestamp < new Date())
										.sort(
											(a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
										)
										.map((event, index) => (
											<div
												key={`activity-${index}`}
												className="flex flex-col gap-0.5"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														{event.user ? (
															<Link
																href={`/users/${event.user.id}`}
																className="text-white flex items-center gap-2 group hover:text-white/70 transition-all"
															>
																<img
																	src={event.user.image}
																	className={twMerge(
																		"w-5 h-5 rounded-full object-cover group-hover:brightness-75 transition-all",
																	)}
																/>
																{event.user.name}
															</Link>
														) : (
															event.icon
														)}
														<p
															className={twMerge(
																event.type === "proposal" && "text-yellow",
																event.type === "vote" && "text-blue-500",
																event.type === "round-start" && "text-green",
																event.type === "voting-start" && "text-purple",
																event.type === "round-end" && "text-red",
																event.type === "comment" && "text-grey-200",
															)}
														>
															{
																{
																	proposal: "created a proposal",
																	vote: "voted",
																	"round-start": "Round started",
																	"voting-start": "Voting started",
																	"round-end": "Round ended",
																	comment: "commented",
																}[event.type]
															}
														</p>
													</div>
													<p className="text-grey-200 text-sm">
														<Countup date={event.timestamp} />
													</p>
												</div>
												{event.caption ? (
													<p className="text-sm line-clamp-2 ml-7">
														"{event.caption}"
													</p>
												) : null}
											</div>
										))}
								</div>
							</div>
						</div>
						<RoundTimeline round={round} />
					</div>
				</div>
				<Proposals
					round={{
						...round,
						awardCount: round.awards.length,
					}}
					user={
						user
							? {
									...user,
									priorVotes,
								}
							: undefined
					}
				/>
			</div>
		</div>
	);
}
