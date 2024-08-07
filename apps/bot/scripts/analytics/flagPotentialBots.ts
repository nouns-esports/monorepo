import fs from "fs";
import { discordClient, rest } from "../..";
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

    if (username.match(/\d{4,5}#0$/)) {
      try {
        let user = await guild.members.search({
          query: username.replace("#0", ""),
        });

        const u = user.first();
        if (u) {
          count++;

          console.log("Flagging user:", username, u.id);

          //   await rest.put(
          //     Routes.guildMemberRole(env.DISCORD_GUILD_ID, u.id, role)
          //   );
        }
      } catch (error) {
        console.error("Error flagging user:", username, error);
        continue;
      }
    }
  }
}

console.log("Flagged", count, "users");
