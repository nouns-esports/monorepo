import { and, asc, desc, eq, lte, or, sql } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, rankings, seasons } from "~/packages/db/schema";

export const getLeaderboard = cache(
	async (input: { season: number }) => {
		//////
		return db.query.rankings.findMany({
			where: and(
				eq(rankings.season, input.season),
				eq(
					rankings.timestamp,
					db
						.select({
							timestamp: sql`max(${rankings.timestamp})`,
						})
						.from(rankings)
						.where(eq(rankings.season, input.season)),
				),
			),
			orderBy: desc(rankings.xp),
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

export const getUserRankings = cache(
	async (input: { user: string }) => {
		return (
			(
				await db.query.seasons.findFirst({
					orderBy: desc(seasons.start),
					where: lte(seasons.start, new Date()),
					with: {
						rankings: {
							where: eq(rankings.user, input.user),
							orderBy: asc(rankings.timestamp),
							with: {
								rank: true,
							},
						},
					},
				})
			)?.rankings ?? []
		);
	},
	["getUserRankings"],
	{ tags: ["getUserRankings"], revalidate: 60 * 10 },
);

export const getSeasons = cache(
	async () => {
		//
		return await db.query.seasons.findMany({
			orderBy: asc(seasons.id),
		});
	},
	["getSeasons"],
	{ tags: ["getSeasons"], revalidate: 60 * 10 },
);
