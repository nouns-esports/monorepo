import { discordClient } from "../clients/discord";
import { env } from "~/env";
import { createJob } from "../createJob";
import { previousFriday, nextFriday, isFriday } from "date-fns";
import { and, lt, eq, sql, asc, gt, desc } from "drizzle-orm";
import { db, gold, nexus, rankings, xp } from "~/packages/db/schema";

// Ranking System
// Each week on friday at 1:30pm CST, the leaderboard is refreshed
// The leaderboard is calculated by giving each user a score based on the sum xp earned within the period averaged with their score from the previous period
//  - If a user scored 5k last period and 1k this period, their score would be 3k. If a user scored 1k last period and 0 this period, their score would be 500.
//  - This degrades their score over time (at most -50% a period) and dampens the impact of volatile increases in scores in a given period
// New users are given the lowest rank but won't be placed on the leaderboard until they earn xp
// Users whos average score is 0, or whos previous score is < 100 & current score is 0 are excluded from the rank distribution and are assumed the lowest rank
// Everyone else is placed in a rank based on their averaged score and the distribution of ranks

// THOUGHT- why do we need to be specific about fridays? Couldn't we just say all xp earned within the last 7 days (or any defined period)
export const refreshLeaderboard = createJob({
	name: "Refresh Leaderboard",
	cron: "30 13 * * 5", // 1:30pm CST every Friday
	execute: async () => {
		const now = new Date();
		const timestamp = nextFriday(now);

		const [leaderboard, ranks] = await Promise.all([
			db.query.rankings.findMany({
				where: eq(rankings.timestamp, timestamp),
				orderBy: desc(rankings.score),
				columns: {
					id: true,
					user: true,
					score: true,
				},
			}),
			db.query.ranks.findMany(), // Add active column
		]);

		await db.transaction(async (tx) => {
			for (const ranking of leaderboard) {
				const rewardGold = await tx
					.insert(gold)
					.values({
						amount: 100,
						timestamp,
						to: ranking.user,
					})
					.returning({
						id: gold.id,
					});

				await tx
					.update(rankings)
					.set({
						gold: rewardGold[0].id,
						rank: 0,
					})

					.where(
						and(
							eq(rankings.user, ranking.user),
							eq(rankings.timestamp, timestamp),
						),
					);

				await tx
					.update(nexus)
					.set({
						gold: 0,
						rank: 0,
					})
					.where(eq(nexus.id, ranking.user));
			}
		});
	},
});
