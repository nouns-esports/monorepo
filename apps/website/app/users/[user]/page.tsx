import Button from "@/components/Button";
import {
	getAuthenticatedUser,
	getUser,
	getUserStats,
} from "@/server/queries/users";
import { notFound } from "next/navigation";
import { Level } from "@/components/Level";
import SettingsModal from "@/components/modals/SettingsModal";
import { ToggleModal } from "@/components/Modal";
import RankChart from "@/components/RankChart";
import { getCurrentRanks } from "@/server/queries/ranks";
import { getUserRankings } from "@/server/queries/rankings";
import DateComponent from "@/components/Date";
import { BarChart, Sparkles } from "lucide-react";
import ProgressCircle from "@/components/ProgressCircle";
import Achievements from "@/components/Achievements";
import { getAchievementsProgress } from "@/server/queries/achievements";
import UserStatsModal from "@/components/modals/UserStatsModal";

export default async function User(props: {
	params: Promise<{ user: string }>;
}) {
	const params = await props.params;

	const [authenticatedUser, user, ranks] = await Promise.all([
		getAuthenticatedUser(),
		getUser({ user: decodeURIComponent(params.user) }),
		getCurrentRanks(),
	]);

	if (!user) {
		return notFound();
	}

	const [userRankings, userStats] = await Promise.all([
		getUserRankings({ user: user.id }),
		getUserStats({ user: user.id }),
		// getAchievementsProgress({ user: authenticatedUser }),
	]);

	return (
		<>
			<div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
				<div className="max-w-2xl w-full flex flex-col gap-4">
					<div className="flex flex-col gap-4 px-6 pt-6 pb-4 w-full rounded-xl bg-grey-800">
						<div className="flex justify-between gap-6">
							<div className="flex gap-4">
								<img
									alt={user.name}
									src={user.image}
									className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
								/>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<h1 className="text-white text-2xl leading-none font-luckiest-guy">
											{user.name}
										</h1>
										{user.rank ? (
											<img
												alt={user.rank.name}
												src={user.rank.image}
												className="h-6 w-6 object-contain"
												title={user.rank.name}
											/>
										) : (
											""
										)}
									</div>
									<p>{user.bio}</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<ToggleModal
									id="user-stats"
									className="flex items-center gap-1 text-red hover:text-red/80 transition-colors"
								>
									<BarChart className="w-4 h-4" />
									Stats
								</ToggleModal>
								{user.id === authenticatedUser?.id ? (
									<ToggleModal id="settings">
										<Button size="sm">Settings</Button>
									</ToggleModal>
								) : null}
							</div>
						</div>
						<div className="flex flex-col gap-4 h-60 w-full">
							<RankChart userRankings={userRankings} ranks={ranks} />
							<Level xp={user.xp} />
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<h2 className="text-white text-3xl font-luckiest-guy leading-none">
							Activity
						</h2>
						{/* Casts, Proposals creations, votes, quest completions, etc. (with filters) */}
					</div>

					{/* <div className="bg-grey-800 relative rounded-xl flex flex-col gap-4 p-4 h-[400px] col-span-2 max-lg:col-span-4">
						<div className="flex items-center justify-between">
							<h2 className="text-white text-2xl font-bebas-neue leading-none">
								Achievements
							</h2>
							<div className="flex items-center gap-3">
								<p className="text-white">
									{completed}/{Object.keys(achievementProgress).length}{" "}
									Completed
								</p>
								<ProgressCircle
									value={completed}
									min={0}
									size={24}
									max={Object.keys(achievementProgress).length}
								/>
							</div>
						</div>
						<div className="bg-grey-600 rounded-xl relative w-full h-full overflow-hidden">
							<Achievements
								user={user}
								achievementProgress={achievementProgress}
							/>
						</div>
					</div> */}
				</div>
			</div>
			{authenticatedUser && <SettingsModal user={authenticatedUser} />}
			<UserStatsModal user={user} stats={userStats} />
		</>
	);
}
