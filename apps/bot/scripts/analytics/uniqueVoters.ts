import { writeFileSync } from "fs";
import { db } from "~/packages/db/schema";

const allVotes = await db.query.votes.findMany({
  with: {
    round: {
      columns: {
        id: true,
        start: true,
        end: true,
      },
    },
  },
  columns: {
    count: true,
  },
});

const rounds: Record<
  string,
  {
    votes: number;
    start: string;
  }
> = {};

for (const vote of allVotes) {
  rounds[vote.round.id] = {
    votes: rounds[vote.round.id]
      ? rounds[vote.round.id].votes + vote.count
      : vote.count,
    start: vote.round.start.toLocaleDateString(),
  };
}

let output = "";

for (const round in rounds) {
  output += `${round},`;
}

output += "\n";

for (const round in rounds) {
  output += `${rounds[round].votes},`;
}

output += "\n";

for (const round in rounds) {
  output += `${rounds[round].start},`;
}

writeFileSync("uniqueVoters.csv", output);
