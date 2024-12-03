"use client";

import { twMerge } from "tailwind-merge";
import Link from "./Link";
import { Sparkles, Vote } from "lucide-react";
import { useModal } from "./Modal";
import { usePlaceBetModal } from "./modals/PlaceBetModal";

export default function PredictionCard(props: {
	id: string;
	name: string;
	image: string;
	xp: number;
	outcomes: Array<{
		id: number;
		name: string;
		outcome: boolean | null;
		totalBets: number;
	}>;
	totalBets: number;
}) {
	const { open } = useModal("place-bet");
	const { setState } = usePlaceBetModal();

	return (
		<Link
			href={`/predictions/${props.id}`}
			className="flex flex-col gap-3 bg-grey-800 rounded-xl px-2 pb-3 pt-4 hover:bg-grey-600 transition-colors aspect-video h-full justify-between"
		>
			<div className="flex justify-between gap-8 px-2 items-center">
				<div className="flex items-center gap-4">
					<img
						src={props.image}
						className="w-[44px] h-[44px] rounded-lg object-cover aspect-square"
					/>
					<p className="text-white font-bebas-neue text-xl line-clamp-2 leading-tight">
						{props.name}
					</p>
				</div>
				{props.outcomes.length === 2 ? (
					<div className="rounded-lg flex flex-col items-center">
						<p className="text-white leading-none">
							{(props.outcomes[0].totalBets / props.totalBets || 0) * 100}%
						</p>
						<p className="text-white/50 text-sm">chance</p>
					</div>
				) : null}
			</div>
			<div className="flex flex-col flex-1 min-h-0 justify-end gap-3">
				{props.outcomes.length === 2 ? (
					<div className="flex w-full gap-2 px-2">
						{props.outcomes
							.toSorted((a, b) =>
								a.name === "Yes"
									? -1
									: b.name === "Yes"
										? 1
										: a.name.localeCompare(b.name),
							)
							.map((outcome, index) => (
								<button
									onClick={() => {
										setState({ outcome });
										open();
									}}
									key={outcome.id}
									className={twMerge(
										"w-full flex items-center justify-center py-2 rounded-lg text-white transition-colors",
										index === 0
											? "bg-green/30 hover:bg-green/50 text-green"
											: "bg-red/30 hover:bg-red/50 text-red",
									)}
								>
									{outcome.name}
								</button>
							))}
					</div>
				) : (
					<div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar mr-2">
						{props.outcomes
							.toSorted((a, b) => a.name.localeCompare(b.name))
							.map((outcome) => (
								<div
									key={outcome.id}
									className="flex w-full pl-2 py-1 rounded-lg text-white hover:text-white/70 transition-colors justify-between"
								>
									{outcome.name}
									<div className="flex items-center gap-3">
										<p className="text-sm">
											{(outcome.totalBets / props.totalBets || 0) * 100}%
										</p>
										<button
											onClick={() => {
												setState({ outcome });
												open();
											}}
											className="text-sm text-green bg-green/30 hover:bg-green/50 px-2 py-0.5 rounded-md"
										>
											Bet
										</button>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
			<div className="flex justify-between items-center px-2">
				<p className="text-sm flex items-center gap-1.5 cursor-default">
					<Vote className="w-4 h-4" />
					{props.totalBets} bets placed
				</p>
				<p
					title={`${props.xp} xp`}
					className="text-white flex items-center gap-2 mr-1 text-sm cursor-default"
				>
					<Sparkles className="w-4 h-4 text-green" />
					{props.xp}
				</p>
			</div>
		</Link>
	);
}
