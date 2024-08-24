import { writeFileSync } from "fs";
import { privyClient } from "..";

let output = "";

const privyUsers = await privyClient.getUsers();

for (const user of privyUsers) {
  if (user.farcaster) {
    output += `${user.farcaster.username},${user.farcaster.fid},\n`;
  }
}

writeFileSync("curators.csv", output);
