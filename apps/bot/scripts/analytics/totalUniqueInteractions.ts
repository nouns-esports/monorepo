import { writeFileSync } from "fs";
import { db } from "~/packages/db/schema";

const voters: Record<string, boolean> = {};

const votes = await db.query.votes.findMany({
  columns: {
    user: true,
  },
});

const proposals = await db.query.proposals.findMany();

for (const vote of votes) {
  voters[vote.user] = true;
}

let output = `voters,${Object.keys(voters).length}\nproposals,${proposals.length}`;

writeFileSync("totalUniqueInteractions.csv", output);
