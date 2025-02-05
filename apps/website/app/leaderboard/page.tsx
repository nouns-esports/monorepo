import Link from "@/components/Link";
import {
	getLeaderboard,
	getLeaderboardPosition,
} from "@/server/queries/rankings";
import { getAuthenticatedUser } from "@/server/queries/users";
import { CaretUp, CaretDown } from "phosphor-react-sc";
import Countdown from "@/components/Countdown";
import { twMerge } from "tailwind-merge";
import DateComponent from "@/components/Date";
import { ToggleModal } from "@/components/Modal";
import { Image } from "lucide-react";
import LastWeekPositionModal from "@/components/modals/LastWeekPositionModal";
import Button from "@/components/Button";

export default async function Leaderboard() {
	const user = await getAuthenticatedUser();

	const [leaderboard, userPosition] = await Promise.all([
		getLeaderboard(),
		user
			? getLeaderboardPosition({
					user: user.id,
				})
			: undefined,
	]);

	return (
		<>
			<div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
				<div className="flex flex-col w-full max-w-screen-md gap-4 p-4">
					<div className="flex items-center justify-between">
						<h2 className="text-white text-3xl font-luckiest-guy leading-none">
							Leaderboard
						</h2>
						<div className="relative flex flex-shrink-0 gap-4 h-48 w-80 bg-red rounded-xl">
							<div className="p-4 flex flex-col justify-center gap-4 h-full w-full">
								<p className="font-bebas-neue text-white text-3xl leading-none w-40">
									Rankup and earn Rewards
								</p>
								<p className="text-white text-sm leading-snug max-w-[180px]">
									Help shape the future of Nouns Esports
								</p>
								<Button href="/nexus">Get Started</Button>
							</div>
							<img
								src="/squirtles.png"
								className="h-[calc(100%_+_8px)] absolute right-2 -top-4"
							/>
						</div>
						{/* <div className="flex items-end bg-grey-800 rounded-xl p-2 px-4 gap-2">
							<h2 className="">Updates in</h2>
							<div className="flex items-center gap-2">
								<p className="text-white">
									<Countdown date={thisFriday} />
								</p>
							</div>
						</div> */}
					</div>
					{/* <div className="flex gap-2 items-center">
					<Link
						href="/leaderboard"
						className={twMerge(
							"text-white text-sm px-4 py-2 rounded-lg hover:bg-grey-500 transition-colors",
							!searchParams.filter ? "bg-grey-500" : "bg-grey-800",
						)}
					>
						Current
					</Link>
					<Link
						href="/leaderboard?filter=last-week"
						className={twMerge(
							"text-white text-sm px-4 py-2 rounded-lg hover:bg-grey-500 transition-colors",
							searchParams.filter === "last-week"
								? "bg-grey-500"
								: "bg-grey-800",
						)}
					>
						Last Week
					</Link>
				</div> */}
					{userPosition ? (
						<div className="flex flex-col gap-2">
							<div className="flex gap-2 justify-between items-center">
								<p className="text-white text-lg font-semibold">
									Your position
								</p>
								<ToggleModal
									id="last-week-position"
									className="flex items-center gap-1.5 text-red"
								>
									<Image className="w-4 h-4" />
									View Image
								</ToggleModal>
							</div>

							<LeaderboardPosition
								position={userPosition.position}
								user={userPosition.user}
								rank={userPosition.rank}
								gold={userPosition.gold?.amount ?? 0}
								diff={userPosition.previousPosition - userPosition.position}
							/>
						</div>
					) : null}

					<div className="relative flex flex-col gap-2">
						<p className="text-white text-lg font-semibold">This Week</p>
						{leaderboard.map((ranking, index) => {
							if (!ranking.user) return;

							const position = index + 1;

							return (
								<LeaderboardPosition
									key={ranking.id}
									position={position}
									user={ranking.user}
									rank={ranking.rank}
									gold={ranking.gold?.amount ?? 0}
									diff={ranking.previousPosition - position}
								/>
							);
						})}
					</div>
				</div>
			</div>
			{userPosition ? <LastWeekPositionModal ranking={userPosition} /> : null}
		</>
	);
}

function LeaderboardPosition(props: {
	position: number;
	user: {
		id: string;
		discord: string | null;
		name: string;
		image: string;
	};
	rank: {
		id: number;
		name: string;
		image: string;
	} | null;
	gold: number;
	diff: number;
}) {
	return (
		<Link
			href={`/users/${props.user.discord ?? props.user.id}`}
			key={props.user.id}
			className="flex justify-between items-center bg-grey-800 hover:bg-grey-600 transition-colors p-4 pr-6 rounded-xl"
		>
			<div className="flex gap-4 items-center">
				<p className="text-white w-6 text-center text-lg">{props.position}</p>
				<div className="flex gap-3 items-center">
					<img
						alt={props.user.name}
						src={props.user.image}
						className="w-8 h-8 rounded-full object-cover"
					/>
					<p className="text-white text-lg">{props.user.name}</p>
				</div>
				{props.diff !== 0 ? (
					<div
						className={twMerge(
							"flex items-center gap-1",
							props.diff > 0 ? "text-green" : "text-red",
						)}
					>
						{props.diff > 0 ? (
							<CaretUp className="w-4 h-4" weight="fill" />
						) : (
							<CaretDown className="w-4 h-4" weight="fill" />
						)}
						{Math.abs(props.diff)}
					</div>
				) : null}
			</div>
			<div className="flex gap-8 items-center">
				{props.gold > 0 ? (
					<div className="flex justify-center gap-1.5 items-center">
						<img
							alt="Gold coin"
							src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
							className="rounded-full h-5 w-5 shadow-xl"
						/>
						<p className="font-semibold text-lg text-[#FEBD1C]">{props.gold}</p>
					</div>
				) : null}
				{props.rank ? (
					<img
						alt={props.rank.name}
						title={props.rank.name}
						className="w-6 h-6 object-contain"
						src={props.rank.image}
					/>
				) : null}
			</div>
		</Link>
	);
}
