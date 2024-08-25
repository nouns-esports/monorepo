import { eq, like } from "drizzle-orm";
import {
  db,
  votes as votesTable,
  proposals as proposalsTable,
  nexus,
} from "~/packages/db/schema";

// The objective of this is to ensure that old props and votes (prior to nouns.gg) adhere to the new nexus table schema where users must exist (context: querying proposals with nexus relation (user must be defined))

const proposals = await db.query.proposals.findMany({
  where: like(proposalsTable.user, `0x%`),
});

const votes = await db.query.proposals.findMany({
  where: like(votesTable.user, `0x%`),
});

const users = new Set<string>();

for (const proposal of proposals) {
  users.add(proposal.user);
}

for (const vote of votes) {
  users.add(vote.user);
}

await db.insert(nexus).values([
  ...[
    "krudo",
    "salt",
    "s2j",
    "kodorin",
    "soonsay",
    "magi",
    "spark",
    "joshman",
  ].map((user) => ({
    id: user,
    name: user,
    handle: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    image: `https://api.cloudnouns.com/v1/pfp?text=${user}&background=1`,
  })),
  ...Array.from(users).map((user) => ({
    id: user,
    name: user.substring(0, 10),
    handle: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    image: `https://api.cloudnouns.com/v1/pfp?text=${user}&background=1`,
  })),
]);
