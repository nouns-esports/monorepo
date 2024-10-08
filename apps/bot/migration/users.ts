import { db, nexus } from "~/packages/db/schema";
import { privyClient } from "..";
import { eq } from "drizzle-orm";

const users = await privyClient.getUsers();
const nexusUsers = await db.query.nexus.findMany();

await db.transaction(async (tx) => {
  for (const nexusUser of nexusUsers) {
    const user = users.find((user) => user.id === nexusUser.id);

    if (!user) continue;

    const discordUsername = user.discord?.username
      ? user.discord.username.split("#")[0]
      : undefined;

    await tx
      .update(nexus)
      .set({
        name:
          discordUsername ??
          user.farcaster?.username ??
          user.twitter?.username ??
          user.id.substring(12, 20),
        image:
          user.farcaster?.pfp ??
          `https://api.cloudnouns.com/v1/pfp?text=${Math.random().toString(36).substring(7)}&background=1`,
        wallet: user.wallet?.address,
        twitter: user.twitter?.username,
        farcaster: user.farcaster?.username,
        discord: discordUsername,
      })
      .where(eq(nexus.id, nexusUser.id));
  }
});
