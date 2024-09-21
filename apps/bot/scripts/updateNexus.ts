import { eq } from "drizzle-orm";
import fs from "fs";
import { env } from "~/env";
import { db, nexus } from "~/packages/db/schema";

const roles = {
  Explorer: "1245110318603042950",
  Challenger: "1245122417903534228",
  Champion: "1245122576645361817",
  // Test roles
  // Champion: "1253532214784819240",
  // Challenger: "1253778440100909118",
  // Explorer: "1253778462511202365",
} as const;

const updates = fs.readFileSync("newNexusUsers.csv", "utf8").split("\n");

await db.transaction(async (tx) => {
  for (const update of updates) {
    const [id, username, subject, tier] = update.split(",");

    if (!id || !username || !tier || !subject) {
      continue;
    }

    const response = await fetch(
      `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${subject}/roles/${roles[tier as "Champion" | "Challenger"]}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add role for ${username}`);
    }

    const delResponse = await fetch(
      `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${subject}/roles/${roles[(tier as "Champion" | "Challenger") === "Champion" ? "Challenger" : "Champion"]}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!delResponse.ok) {
      throw new Error(`Failed to remove role for ${username}`);
    }

    await tx
      .update(nexus)
      .set({ tier: tier as "Champion" | "Challenger" })
      .where(eq(nexus.user, id));

    console.log("Update user", username, "to", tier);

    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
});
