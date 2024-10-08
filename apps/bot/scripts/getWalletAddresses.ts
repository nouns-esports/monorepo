import { eq } from "drizzle-orm";
import { db, proposals } from "~/packages/db/schema";
import { privyClient } from "..";
import fs from "fs";

const roundProposals = await db.query.proposals.findMany({
  where: eq(proposals.round, "smash-combos"),
});

let output = "";

let walletCount = 0;

for (const proposal of roundProposals) {
  const user = await privyClient.getUser(proposal.user);

  if (user.wallet) {
    output += `${user.discord?.username ?? user.id},${user.wallet.address}\n`;
    walletCount++;
    continue;
  }

  console.log(user.id, "missing wallet");
}

fs.writeFileSync("wallet-addresses.csv", output);

console.log(output);

console.log("walletCount", walletCount);
console.log("missing wallet", roundProposals.length - walletCount);
