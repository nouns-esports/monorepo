import Link from "@/components/Link";
import { getLeaderboard, getSeasons } from "@/server/queries/rankings";
import { getAuthenticatedUser } from "@/server/queries/users";
import { CaretUp, CaretDown } from "phosphor-react-sc";
import Countdown from "@/components/Countdown";
import { twMerge } from "tailwind-merge";
import Tabs from "@/components/Tabs";
import { nextFridayAt2pmCST } from "@/utils/nextFridayAt2pmCST";

export default async function Leaderboard(props: {
	searchParams: { season?: string };
}) {
	const searchParams = await props.searchParams;

	const user = await getAuthenticatedUser();

	const seasons = await getSeasons();

	const leaderboard = await getLeaderboard({
		season: Number(searchParams.season ?? 1),
	});

	const nextUpdate = nextFridayAt2pmCST();

	return (
		<div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col w-full max-w-screen-md gap-4 p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-white text-3xl font-luckiest-guy leading-none">
						Leaderboard
					</h2>
					<div className="flex items-end flex-col gap-1">
						<h2 className="">Updates in</h2>
						<div className="flex items-center gap-2">
							<p className="text-white">
								<Countdown date={nextUpdate} />
							</p>
						</div>
					</div>
				</div>
				{/* <Tabs
					id="type"
					selected={"global"}
					options={{
						global: "Global",
						friends: "Friends",
					}}
				/> */}
				<div className="flex flex-col gap-4">
					<ul className="flex gap-2 items-center">
						{seasons.map((season, index) => (
							<li
								key={season.id}
								className={twMerge(
									"text-white text-sm bg-grey-800 px-4 py-2 rounded-lg",
									((!searchParams.season && index === 0) ||
										Number(searchParams.season) === season.id) &&
										"bg-grey-500",
								)}
							>
								<Link
									href={`/leaderboard${index === 0 ? "" : `?season=${season.id}`}`}
								>
									Season {season.id}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="relative flex flex-col gap-2">
					{leaderboard.map((ranking) => {
						if (!ranking.user) return;
						if (!ranking.rank) return;

						return (
							<Link
								href={`/users/${ranking.user.discord ?? ranking.user.id}`}
								key={ranking.id}
								className={twMerge(
									"flex justify-between items-center bg-grey-800 hover:bg-grey-600 transition-colors p-4 pr-6 rounded-xl",
									// ranking.user.id === user?.id &&
									// 	"bg-blue-700 hover:bg-blue-800 sticky top-0 bottom-0",
								)}
							>
								<div className="flex gap-4 items-center">
									<p className="text-white w-6 text-center text-lg">
										{ranking.position}
									</p>
									<div className="flex gap-3 items-center">
										<img
											alt={ranking.user.name}
											src={ranking.user.image}
											className="w-8 h-8 rounded-full object-cover"
										/>
										<p className="text-white text-lg">{ranking.user.name}</p>
									</div>
									{ranking.diff !== 0 ? (
										<div
											className={twMerge(
												"flex items-center gap-1",
												// ranking.user.id === user?.id
												// 	? "text-white"
												// 	:
												ranking.diff > 0 ? "text-green" : "text-red",
											)}
										>
											{ranking.diff > 0 ? (
												<CaretUp className="w-4 h-4" weight="fill" />
											) : (
												<CaretDown className="w-4 h-4" weight="fill" />
											)}
											{Math.abs(ranking.diff)}
										</div>
									) : null}
								</div>
								<div className="flex gap-8 items-center">
									<div className="flex justify-center gap-2 items-center">
										<img
											alt="Gold coin"
											src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
											className="rounded-full h-5 w-5 shadow-xl"
										/>
										<p className="font-semibold text-lg text-[#FEBD1C]">100</p>
									</div>
									<img
										alt={ranking.rank.name}
										title={ranking.rank.name}
										className="w-6 h-6 object-contain"
										src={ranking.rank.image}
									/>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
