import { and, eq, ne } from "drizzle-orm";
import { writeFileSync } from "fs";
import { db, votes } from "~/packages/db/schema";
import { privyClient } from "../..";

const proposal = 339;

const firstTime = true;

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

    const userVotes = await db.query.votes.findMany({
      where: and(eq(votes.user, voter.user), ne(votes.proposal, proposal)),
      columns: {
        id: true,
      },
    });

    console.log(
      "Voter: ",
      user.discord.username,
      userVotes.length > 0 ? "no" : "yes"
    );

    output += `${user.discord?.username.replace("#0", "")},${firstTime ? `${userVotes.length > 0 ? "no" : "yes"},` : ""}\n`;
  } catch (e) {
    console.error(`No discord or user for voter ${voter.user}`);
  }

  await new Promise((r) => setTimeout(r, 250));
}

writeFileSync(`votersForProposal${proposal}.csv`, output);
