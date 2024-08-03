import { env } from "~/env";
import { discordClient, privyClient } from "../..";
import { db, votes } from "~/packages/db/schema";
import { and, eq } from "drizzle-orm";
import { writeFileSync } from "fs";

await new Promise((r) => setTimeout(r, 1000));

const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

const members = await guild.members.fetch();

let output = "";

for (const [id, member] of members) {
  if (member.roles.cache.has("1266466491859992676")) {
    try {
      const users = await privyClient.getUsers(member.user.username);

      const user = users[0];

      console.log("Checking", member.user.username, user.id);

      if (user) {
        const vote = await db.query.votes.findFirst({
          where: and(
            eq(votes.round, "nounsvitational-merch"),
            eq(votes.user, user.id)
          ),
        });

        if (vote) {
          output += `${member.user.username},${user.id},${vote.proposal}\n`;
          console.log(member.user.username, vote.proposal);
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
}

writeFileSync("botCheck.csv", output);
