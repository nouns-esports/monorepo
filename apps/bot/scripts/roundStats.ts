// import { eq } from "drizzle-orm";
// import { db, rounds } from "~/packages/db/schema";
// import fs from "fs";

// const round = await db.query.rounds.findFirst({
// 	where: eq(rounds.id, "smash-2025"),
// 	with: {
// 		votes: true,
// 		proposals: true,
// 	},
// });

// if (!round) {
// 	throw new Error("Round not found");
// }

// const voters = new Set();
// const proposers = new Set();

// for (const vote of round.votes) {
// 	voters.add(vote.user);
// }

// for (const proposal of round.proposals) {
// 	proposers.add(proposal.user);
// }

// fs.writeFileSync(
// 	`${round.id}.json`,
// 	JSON.stringify({
// 		totalParticipants: voters.size + proposers.size,
// 		totalVotes: round.votes.reduce((acc, vote) => acc + vote.count, 0),
// 	}),
// );
