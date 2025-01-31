import { eq, ne } from "drizzle-orm";
import { rounds, db, proposals } from "../../packages/db/schema";

const round = await db.query.rounds.findFirst({
	where: eq(rounds.id, "nounish-cup-2"),
	with: {
		proposals: {
			with: {
				votes: {
					with: {
						user: {
							with: {
								votes: {
									where: ne(proposals.round, "nounish-cup-2"),
								},
								proposals: {
									where: ne(proposals.round, "nounish-cup-2"),
								},
							},
						},
					},
				},
				user: {
					with: {
						votes: {
							where: ne(proposals.round, "nounish-cup-2"),
						},
						proposals: {
							where: ne(proposals.round, "nounish-cup-2"),
						},
					},
				},
			},
		},
	},
});

if (!round) {
	throw new Error("Round not found");
}

const newUsers = new Set<string>();

for (const proposal of round.proposals) {
	if (
		proposal.user.proposals.length === 0 &&
		proposal.user.votes.length === 0
	) {
		newUsers.add(proposal.user.id);
	}

	for (const vote of proposal.votes) {
		if (!vote.user) continue;

		if (vote.user.proposals.length === 0 && vote.user.votes.length === 0) {
			newUsers.add(vote.user.id);
		}
	}
}

console.log(newUsers.size);
