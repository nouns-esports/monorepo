import { and, asc, desc, eq, lt, lte, sql } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, rankings } from "~/packages/db/schema";

export const getLeaderboard = cache(
	async (input: { date: Date }) => {
		return db.query.rankings.findMany({
			where: and(
				lt(rankings.timestamp, input.date),
				eq(
					rankings.timestamp,
					db
						.select({
							timestamp: sql`max(${rankings.timestamp})`,
						})
						.from(rankings)
						.where(lt(rankings.timestamp, input.date)),
				),
			),
			orderBy: asc(rankings.position),
			limit: 100,
			with: {
				rank: true,
				user: true,
				gold: true,
			},
		});
	},
	["getLeaderboard"],
	{ tags: ["getLeaderboard"], revalidate: 60 * 10 },
);

export const getLeaderboardPosition = cache(
	async (input: { user: string; date: Date }) => {
		return db.query.rankings.findFirst({
			where: and(
				eq(rankings.user, input.user),
				lt(rankings.timestamp, input.date),
				eq(
					rankings.timestamp,
					db
						.select({
							timestamp: sql`max(${rankings.timestamp})`,
						})
						.from(rankings)
						.where(lt(rankings.timestamp, input.date)),
				),
			),
			orderBy: asc(rankings.position),
			with: {
				rank: true,
				user: true,
				gold: true,
			},
		});
	},
	["getLeaderboardPosition"],
	{ tags: ["getLeaderboardPosition"], revalidate: 60 * 10 },
);

export const getUserRankings = cache(
	async (input: { user: string }) => {
		return db.query.rankings.findMany({
			where: eq(rankings.user, input.user),
			orderBy: asc(rankings.timestamp),
			with: {
				rank: true,
			},
		});
	},
	["getUserRankings"],
	{ tags: ["getUserRankings"], revalidate: 60 * 10 },
);
