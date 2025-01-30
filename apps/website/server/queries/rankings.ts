import { and, asc, desc, eq, inArray, lt, lte, sql } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, rankings, rankingsRelations } from "~/packages/db/schema";

export const getLeaderboard = cache(
	async (input: { date: Date }) => {
		//
		const previousWeek = new Date(
			input.date.getTime() - 7 * 24 * 60 * 60 * 1000,
		);
		return db.query.rankings.findMany({
			where: eq(rankings.timestamp, input.date),
			orderBy: desc(rankings.score),
			limit: 100,
			with: {
				rank: true,
				user: true,
				gold: true,
			},
			extras: {
				previousPosition: sql<number>`
					(
						SELECT rank_index FROM (
							SELECT 
								"user",
								ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_index
							FROM ${rankings}
							WHERE timestamp = ${previousWeek.toISOString()}
						) AS ranked
						WHERE ranked."user" = rankings."user"
					)
				`.as("previousPosition"),
			},
		});

		// const users = leaderboard
		// 	.filter((ranking) => ranking.user)
		// 	.map((ranking) => ranking.user.id);

		// const previousWeek = new Date(
		// 	input.date.getTime() - 7 * 24 * 60 * 60 * 1000,
		// );
		// //
		// const lastPositions = await db.execute(sql`
		// 	WITH ranked_rankings AS (
		// 		SELECT
		// 			"user",
		// 			xp,
		// 			ROW_NUMBER() OVER (ORDER BY xp DESC) AS position
		// 		FROM public.rankings
		// 		WHERE timestamp = ${previousWeek.toISOString()}
		// 	)
		// 	SELECT
		// 		"user",
		// 		position
		// 	FROM ranked_rankings
		// 	WHERE "user" IN (
		// 		'did:privy:cm31utuiv05nfxzwomufqozl9',
		// 		'did:privy:cm1zpxncy033o6mxlikplbvyp',
		// 		'did:privy:cm1z9eo1i04rtibtgjidkc68y',
		// 		'did:privy:cm1z7hte1066va88rz77hubji'
		// 	);
		// `);

		// console.log(lastPositions.rows);
		// return {
		// 	leaderboard,
		// 	lastPositions,
		// };
	},
	["getLeaderboard"],
	{ tags: ["getLeaderboard"], revalidate: 60 * 10 },
);
// Working SQL
// WITH previous_rankings AS (
//     SELECT
//         "user",
//         xp,
//         RANK() OVER (ORDER BY xp DESC) AS lastPosition
//     FROM public.rankings
//     WHERE "timestamp" = '2025-01-24T19:00:00.000Z'
// ),
// current_rankings AS (
//     SELECT
//         *
//     FROM public.rankings
//     WHERE "timestamp" = '2025-01-31T19:00:00.000Z'
// )
// SELECT
//     c.*,
//     p.lastPosition
// FROM current_rankings c
// LEFT JOIN previous_rankings p
//     ON c."user" = p."user"
// ORDER BY c.xp DESC
// LIMIT 100;

// lastPosition parts (that work)
// WITH ranked_rankings AS (
// 	SELECT
// 	  "user",
// 	  xp,
// 	  ROW_NUMBER() OVER (ORDER BY xp DESC) AS rank_index
// 	FROM public.rankings
// 	WHERE timestamp = '2025-01-24T19:00:00.000Z'
//   )
//   SELECT rank_index
//   FROM ranked_rankings
//   WHERE "user" = 'did:privy:cm31utuiv05nfxzwomufqozl9';

export const getLeaderboardPosition = cache(
	async (input: { user: string; date: Date }) => {
		////
		const previousWeek = new Date(
			input.date.getTime() - 7 * 24 * 60 * 60 * 1000,
		);

		return db.query.rankings.findFirst({
			where: and(
				eq(rankings.user, input.user),
				eq(rankings.timestamp, input.date),
			),
			orderBy: desc(rankings.score),
			with: {
				rank: true,
				user: true,
				gold: true,
			},
			extras: {
				position: sql<number>`(
					SELECT rank_index FROM (
						SELECT 
							"user",
							ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_index
						FROM ${rankings}
						WHERE timestamp = ${input.date.toISOString()}
					) AS ranked
					WHERE ranked."user" = rankings."user"
				)`.as("position"),
				previousPosition: sql<number>`(
					SELECT rank_index FROM (
						SELECT 
							"user",
							ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_index
						FROM ${rankings}
						WHERE timestamp = ${previousWeek.toISOString()}
					) AS ranked
					WHERE ranked."user" = rankings."user"
				)`.as("previousPosition"),
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
