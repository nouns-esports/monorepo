import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { db, votes } from "~/packages/db/schema";
import fs from "fs";
const voters = await db.query.votes.findMany({
	where: and(eq(votes.round, "gx2"), eq(votes.proposal, 535)),
	with: {
		user: true,
	},
});

let output = "";

for (const voter of voters) {
	output += `${voter.user.discord}, ${voter.count}\n`;
}

fs.writeFileSync("output.csv", output);
