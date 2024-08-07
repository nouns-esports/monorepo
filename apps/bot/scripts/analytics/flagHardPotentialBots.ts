import fs from "fs";
import { discordClient, privyClient, rest } from "../..";
import { Routes } from "discord.js";
import { env } from "~/env";

const data = fs.readFileSync("votersForProposal340.csv", "utf8");

const lines = data.split("\n");

let count = 0;

const role = "1266466491859992676";

await new Promise((r) => setTimeout(r, 3000));

const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();

  if (line) {
    const [username] = line.split(",");

    try {
      const privyUser = await privyClient.getUsers(username.replace("#0", ""));

      //   console.log("Found user:", username, privyUser);

      if (privyUser[0].discord?.subject) {
        count++;

        console.log("Flagging user:", username, privyUser[0].discord.subject);

        //   await rest.put(
        //     Routes.guildMemberRole(env.DISCORD_GUILD_ID, u.id, role)
        //   );
      }

      await new Promise((r) => setTimeout(r, 1000));
    } catch (error) {
      //   console.error("Error flagging user:", username, error);
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }
  }
}

console.log("Flagged", count, "users");
