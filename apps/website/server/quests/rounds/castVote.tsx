import { and, eq } from "drizzle-orm";
import createAction from "../createAction";
import { db, rounds, votes, type Round } from "~/packages/db/schema";

export const castVote = createAction<{ round?: string }>(
	async (actionInputs) => {
		let round: Round | undefined;

		if (actionInputs.round) {
			round = await db.query.rounds.findFirst({
				where: eq(rounds.id, actionInputs.round),
			});
		}

		return {
			description: round ? (
				<p>
					Vote on a proposal in <span className="text-red">{round.name}</span>
				</p>
			) : (
				<p>Vote on any proposal</p>
			),
			url: round ? `/rounds/${round.id}` : "/rounds",
			check: async (user) => {
				const vote = await db.query.votes.findFirst({
					where: and(
						eq(votes.user, user.id),
						round ? eq(votes.round, round.id) : undefined,
					),
				});

				if (!vote) return false;

				return true;
			},
		};
	},
);
