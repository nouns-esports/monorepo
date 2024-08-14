import { eq } from "drizzle-orm";
import { env } from "~/env";
import { db, nexus } from "~/packages/db/schema";
import { privyClient } from "..";

const users = await db.query.nexus.findMany({
  where: eq(nexus.tier, "Explorer"),
});

for (const user of users) {
  try {
    const privyUser = await privyClient.getUser(user.user);

    if (!privyUser.discord?.subject) continue;

    await fetch(
      `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${privyUser.discord.subject}/roles/1245110318603042950`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Updated Explorer role to ${privyUser.discord.username}`);

    await new Promise((resolve) => setTimeout(resolve, 250));
  } catch (e) {
    console.error(`Failed to update ${user.user}`);
  }
}
