import { eq } from "drizzle-orm";
import { writeFileSync } from "fs";
import { db, votes } from "~/packages/db/schema";
import { privyClient } from "../..";

const proposal = 258;

const voters = await db.query.votes.findMany({
  where: eq(votes.proposal, proposal),
  columns: {
    user: true,
  },
});

let output = "";

for (const voter of voters) {
  try {
    const user = await privyClient.getUser(voter.user);

    if (!user.discord?.username) {
      throw new Error();
    }

    console.log("Voter: ", user.discord.username);

    output += `${user.discord?.username},\n`;
  } catch (e) {
    console.error(`No discord or user for voter ${voter.user}`);
  }

  await new Promise((r) => setTimeout(r, 250));
}

writeFileSync(`votersForProposal${proposal}.csv`, output);
