import { discordClient } from "../clients/discord";
import { env } from "~/env";
import { createJob } from "../createJob";
import { previousFriday } from "date-fns";
import { and, lt, eq, sql, asc, gt } from "drizzle-orm";
import { db, rankings, xp } from "~/packages/db/schema";

export const refreshLeaderboard = createJob({
	name: "Refresh Leaderboard",
	cron: "50 13 * * *", // 1:50pm CST
	execute: async () => {
		const now = new Date();
		const lastFriday = previousFriday(now);

		const [previousLeaderboard, xpEarnedThisWeek] = await Promise.all([
			db.query.rankings.findMany({
				where: and(
					lt(rankings.timestamp, lastFriday),
					eq(
						rankings.timestamp,
						db
							.select({
								timestamp: sql`max(${rankings.timestamp})`,
							})
							.from(rankings)
							.where(lt(rankings.timestamp, lastFriday)),
					),
				),
				orderBy: asc(rankings.position),
				columns: {
					user: true,
					position: true,
				},
			}),
			db.query.xp.findMany({
				where: and(gt(xp.timestamp, lastFriday), lt(xp.timestamp, now)),
				columns: {
					user: true,
					amount: true,
				},
			}),
		]);

		const records: Record<string, number | undefined> = {};

		for (const xp of xpEarnedThisWeek) {
			records[xp.user] = (records[xp.user] ?? 0) + xp.amount;
		}

		const leaderboard = Object.entries(records)
			.map(([user, xp]) => ({
				user,
				xp: xp ?? 0,
			}))
			.toSorted((a, b) => b.xp - a.xp);
	},
});
