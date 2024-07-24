import { writeFileSync } from "fs";
import { db } from "~/packages/db/schema";

const proposals = await db.query.votes.findMany({
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
    proposals: number;
    start: string;
  }
> = {};

for (const proposal of proposals) {
  rounds[proposal.round.id] = {
    proposals: rounds[proposal.round.id]
      ? rounds[proposal.round.id].proposals + proposal.count
      : proposal.count,
    start: proposal.round.start.toLocaleDateString(),
  };
}

let output = "";

for (const round in rounds) {
  output += `${round},${rounds[round].proposals},${rounds[round].start},\n`;
}

writeFileSync("proposalCount.csv", output);
