"use client";

import { ArrowRight, X } from "lucide-react";
import { Modal, ToggleModal } from "../Modal";
import type { Rankings } from "~/packages/db/schema";
import type { getLeaderboardPosition } from "@/server/queries/rankings";
import { twMerge } from "tailwind-merge";
import { CaretDown } from "phosphor-react-sc";
import { CaretUp } from "phosphor-react-sc";
import Link from "../Link";

export default function LastWeekPositionModal(props: {
	ranking: NonNullable<Awaited<ReturnType<typeof getLeaderboardPosition>>>;
}) {
	const diff = props.ranking.previousPosition - props.ranking.position;
	return (
		<Modal
			id="last-week-position"
			className="p-4 flex flex-col max-w-[500px] w-80 gap-4"
		>
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Your Position
				</p>
				<ToggleModal
					id="last-week-position"
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</ToggleModal>
			</div>
			<div className="flex flex-col aspect-video/ justify-between gap-6 border border-grey-800 bg-gradient-to-br from-[#160B42]/50 /via-black to-[#570E0E]/50 p-4 rounded-lg">
				<div className="flex items-center justify-between">
					<div className="flex gap-3 items-center">
						<img src={props.ranking.user.image} className="w-9 rounded-full" />
						<p className="text-white text-lg font-semibold">
							{props.ranking?.user.name}
						</p>
					</div>
					<div className="flex gap-4 items-center">
						{diff !== 0 ? (
							<div
								className={twMerge(
									"flex items-center gap-1",
									diff > 0 ? "text-green" : "text-red",
								)}
							>
								{diff > 0 ? (
									<CaretUp className="w-4 h-4" weight="fill" />
								) : (
									<CaretDown className="w-4 h-4" weight="fill" />
								)}
								{Math.abs(diff)}
							</div>
						) : null}
						<p className="text-white text-lg font-semibold">
							#{props.ranking.position}
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					{props.ranking.rank ? (
						<div className="flex gap-2 items-center">
							<img src={props.ranking.rank.image} className="w-8" />
							<p
								className="text-white text-2xl font-bebas-neue leading-none"
								style={{ color: props.ranking.rank.color }}
							>
								{props.ranking.rank.name}
							</p>
						</div>
					) : null}
					{props.ranking.gold && props.ranking.gold.amount > 0 ? (
						<div className="flex justify-center gap-1.5 items-center">
							<img
								alt="Gold coin"
								src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
								className="rounded-full h-5 w-5 shadow-xl"
							/>
							<p className="font-semibold text-lg text-[#FEBD1C]">
								{props.ranking.gold.amount}
							</p>
						</div>
					) : null}
				</div>
			</div>
			<Link
				newTab
				href=""
				// href={`/chat?post=true&embeds[]=${env.NEXT_PUBLIC_DOMAIN}/api/frames/rounds/${props.round}/votes/${user?.id}/`}
				// href={`https://warpcast.com/~/compose?embeds[]=${env.NEXT_PUBLIC_DOMAIN}/api/frames/rounds/${props.round}/votes/${user?.id}/`}
				className="flex gap-1 items-center group hover:opacity-80 transition-opacity text-red"
			>
				Share this image on Warpcast
				<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
			</Link>
		</Modal>
	);
}
