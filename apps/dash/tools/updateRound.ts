import { agent } from "../";
import { db, rounds } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

agent.addTool({
	description: "Updates a round",
	providers: ["discord"],
	parameters: z.object({
		round: z
			.string()
			.describe(
				"The round id to update (the path segment displayed after /rounds/ in the url)",
			),
		update: z.object({
			name: z.string().optional().describe("The new name/title of the round"),
			// start: z.date().optional().describe("The date and time the round starts"),
			// votingStart: z
			// 	.date()
			// 	.optional()
			// 	.describe("The date and time the round voting starts"),
			// end: z.date().optional().describe("The date and time the round ends"),
			// community: z
			// 	.string()
			// 	.optional()
			// 	.describe("The community the round belongs to"),
			// event: z.string().optional().describe("The event the round belongs to"),
			featured: z
				.boolean()
				.optional()
				.describe(
					"Change whether the round should be featured and pinned to the top of the feed",
				),
		}),
	}),
	execute: async ({ parameters, context }) => {
		console.log(parameters);
		console.log(context);

		if (
			![
				"samscolari",
				"sasquatch",
				"peterpandam",
				"ohantheman",
				"patyiutazza",
			].includes(context.author)
		) {
			throw new Error("You are not authorized to update rounds");
		}

		const round = await db.query.rounds.findFirst({
			where: eq(rounds.id, parameters.round),
		});

		if (!round) {
			throw new Error("I couldn't find that round");
		}

		await db.transaction(async (tx) => {
			if (parameters.update.name) {
				await tx
					.update(rounds)
					.set({ name: parameters.update.name })
					.where(eq(rounds.id, round.id));
			}

			if (parameters.update.featured) {
				await tx
					.update(rounds)
					.set({ featured: parameters.update.featured })
					.where(eq(rounds.id, round.id));
			}
		});
	},
});
