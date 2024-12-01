import { twMerge } from "tailwind-merge";
import Link from "./Link";
import { Sparkles, Vote } from "lucide-react";
import { ToggleModal } from "./Modal";
import PlaceBetModal from "./modals/PlaceBetModal";

export default function PredictionCard(props: {
	id: string;
	name: string;
	image: string;
	xp: number;
	outcomes: Array<{
		id: number;
		name: string;
		outcome: boolean | null;
	}>;
}) {
	return (
		<>
			<div
				// href={`/predictions/${props.id}`}
				className="flex flex-col gap-2 bg-grey-800 rounded-xl px-4 pb-3 pt-4 hover:bg-grey-600 transition-colors overflow-hidden aspect-video justify-between"
			>
				<div className="flex justify-between gap-4 items-start">
					<div className="flex items-center gap-4">
						<img
							src={props.image}
							className="w-10 h-10 rounded-lg object-cover aspect-square"
						/>
						<p className="text-white font-bebas-neue text-xl line-clamp-2 leading-tight">
							{props.name}
						</p>
					</div>
					<p className="text-white flex items-center gap-2 mr-1">
						<Sparkles className="w-4 h-4 text-green" />
						{props.xp}
					</p>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						{props.outcomes.length === 2 ? (
							<div className="flex w-full gap-2">
								{props.outcomes
									.toSorted((a, b) => a.name.localeCompare(b.name))
									.map((outcome, index) => (
										<ToggleModal
											id={`prediction-${props.id}-${outcome.id}`}
											key={outcome.name}
											className={twMerge(
												"w-full flex items-center justify-center py-2 rounded-lg text-white transition-colors",
												index === 0
													? "bg-green hover:bg-green/80"
													: "bg-red hover:bg-red/80",
											)}
										>
											{outcome.name}
										</ToggleModal>
									))}
							</div>
						) : (
							<div className="flex flex-col gap-2">
								{props.outcomes
									.toSorted((a, b) => a.name.localeCompare(b.name))
									.map((outcome) => (
										<ToggleModal
											id={`prediction-${props.id}-${outcome.id}`}
											key={outcome.name}
										>
											<button className="">{outcome.name}</button>
										</ToggleModal>
									))}
							</div>
						)}
					</div>
					<p className="text-sm flex items-center gap-1.5">
						<Vote className="w-4 h-4" />5 bets placed
					</p>
				</div>
			</div>
			{props.outcomes.map((outcome) => (
				<PlaceBetModal
					key={`modal-${props.id}-${outcome.id}`}
					prediction={props.id}
					outcome={outcome}
				/>
			))}
		</>
	);
}
