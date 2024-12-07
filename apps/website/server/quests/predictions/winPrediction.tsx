import { and, eq } from "drizzle-orm";
import createAction from "../createAction";
import { db, bets, predictions } from "~/packages/db/schema";

export const winPrediction = createAction<{ prediction: string }>(
	async (actionInputs) => {
		if (!actionInputs.prediction) {
			throw new Error("No prediction in action");
		}

		const prediction = await db.query.predictions.findFirst({
			where: eq(predictions.id, actionInputs.prediction),
			with: {
				outcomes: true,
			},
		});

		if (!prediction) {
			throw new Error("Prediction not found");
		}

		return {
			description: (
				<p>
					Make a prediction on
					<span className="text-red">{prediction.name}</span>
				</p>
			),
			url: `/predictions/${prediction.id}`,
			check: async (user) => {
				const bet = await db.query.bets.findFirst({
					where: and(
						eq(bets.user, user.id),
						eq(bets.prediction, prediction.id),
					),
				});

				if (!bet) return false;

				const winningOutcomes = prediction.outcomes.filter(
					(outcome) => outcome.outcome,
				);

				return winningOutcomes.some((outcome) => outcome.id === bet.outcome);
			},
		};
	},
);