import { env } from "~/env";
import { createJob } from "../createJob";
import { and, lt, eq, sql, asc, gt, desc } from "drizzle-orm";
import { db, gold, nexus, rankings, xp, ranks } from "~/packages/db/schema";

// Ranking System
// Each week on friday at 1:30pm CST, the leaderboard is refreshed
// The leaderboard is calculated by giving each user a score based on the sum xp earned within the period averaged with their score from the previous period
//  - If a user scored 5k last period and 1k this period, their score would be 3k. If a user scored 1k last period and 0 this period, their score would be 500.
//  - This degrades their score over time (at most -50% a period) and dampens the impact of volatile increases in scores in a given period
// New users are given the lowest rank but won't be placed on the leaderboard until they earn xp
// Users whos average score is 0, or whos previous score is < 100 & current score is 0 are excluded from the rank distribution and are assumed the lowest rank
// Everyone else is placed in a rank based on their averaged score and the distribution of ranks

export const refreshLeaderboard = createJob({
	name: "Refresh Leaderboard",
	cron: "50 13 * * 5", // 1:50pm CST every Friday
	execute: async () => {
		const now = new Date();

		const [currentLeaderboard, xpEarned, activeRanks] = await Promise.all([
			// The most recent leaderboard
			db.query.rankings.findMany({
				where: eq(
					rankings.timestamp,
					sql`(SELECT MAX(timestamp) FROM ${rankings})`,
				),
				orderBy: desc(rankings.score),
				columns: {
					id: true,
					user: true,
					score: true,
				},
			}),
			// All xp earned after the most recent leaderboard was created
			db.query.xp.findMany({
				where: gt(xp.timestamp, sql`(SELECT MAX(timestamp) FROM ${rankings})`),
				columns: {
					amount: true,
					user: true,
				},
			}),
			// All active ranks
			db.query.ranks.findMany({
				where: eq(ranks.active, true),
				orderBy: asc(ranks.place),
			}),
		]);

		const xpEarnedByUsers: Record<string, number> = {};

		for (const xp of xpEarned) {
			xpEarnedByUsers[xp.user] = (xpEarnedByUsers[xp.user] ?? 0) + xp.amount;
		}

		const leaderboard = Object.entries(xpEarnedByUsers)
			.map(([user, xp]) => {
				const previousRanking = currentLeaderboard.find(
					(ranking) => ranking.user === user,
				);

				const previousScore = previousRanking?.score ?? 0;

				let score = previousScore + xp;

				// Decay the score, but give a grace period for new scores
				if (previousScore > 0 || xp > 2500) {
					score /= 2;
				}

				return {
					user,
					score,
				};
			})
			.toSorted((a, b) => b.score - a.score);

		const potOfGold = 10_000; // $100
		const usersEligibleForGold = leaderboard.filter(
			(user) => user.score >= 100,
		).length;

		await db.transaction(async (tx) => {
			for (let i = 0; i < leaderboard.length; i++) {
				// If the users score dropped below 100, set their rank to the lowest and skip
				if (leaderboard[i].score < 100) {
					await tx
						.update(nexus)
						.set({
							rank: activeRanks[0].id,
						})
						.where(eq(nexus.id, leaderboard[i].user));
					continue;
				}

				const percentile = (i + 1) / leaderboard.length;

				const rank =
					activeRanks.find((r) => percentile <= Number(r.percentile)) ??
					activeRanks[0];

				await tx
					.update(nexus)
					.set({
						rank: rank.id,
					})
					.where(eq(nexus.id, leaderboard[i].user));

				let goldRecord: number | undefined;

				// if (eligible) {
				// 	const earnedGold = await tx
				// 		.insert(gold)
				// 		.values({
				// 			amount: 0,
				// 			timestamp: now,
				// 			to: leaderboard[i].user,
				// 		})
				// 		.returning({ id: gold.id });

				// 	goldRecord = earnedGold[0].id;
				// }

				await tx.insert(rankings).values({
					rank: rank.id,
					gold: goldRecord,
					timestamp: now,
					user: leaderboard[i].user,
					score: leaderboard[i].score,
				});
			}
		});
	},
});
