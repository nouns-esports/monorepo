import { eq } from "drizzle-orm";
import { db, rounds } from "~/packages/db/schema";

const allRounds = await db.query.rounds.findMany({
	with: {
		votes: true,
		proposals: true,
	},
});

await db.transaction(async (tx) => {
	for (const round of allRounds) {
		const participants = new Set<string>();

		for (const vote of round.votes) {
			participants.add(vote.user);
		}

		for (const proposal of round.proposals) {
			participants.add(proposal.user);
		}

		await tx
			.update(rounds)
			.set({
				totalParticipants: participants.size,
			})
			.where(eq(rounds.id, round.id));
	}
});
