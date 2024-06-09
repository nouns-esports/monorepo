import { desc, lt, inArray, and, eq } from "drizzle-orm";
import { db, rounds, proposals, votes, nexus } from "~/packages/db/schema";
import { PrivyClient, type User } from "@privy-io/server-auth";
import { env } from "~/env";

export const privyClient = new PrivyClient(
  env.NEXT_PUBLIC_PRIVY_APP_ID,
  env.PRIVY_APP_SECRET
);

export async function refreshNexus() {
  return db.transaction(async (tx) => {
    const nexusUsers = await db.query.nexus.findMany();

    const completedRounds = await db.query.rounds.findMany({
      where: lt(rounds.end, new Date()),
      limit: 5,
      orderBy: desc(rounds.end),
      columns: {
        id: true,
      },
    });

    for (const nexusUser of nexusUsers) {
      let privyUser: User;

      try {
        privyUser = await privyClient.getUser(nexusUser.user);
      } catch (error) {
        console.error(`No user found for ${nexusUser.user}`, error);
        continue;
      }

      const active = await wasActive(
        nexusUser.user,
        completedRounds.map((r) => r.id)
      );

      const inDiscord = privyUser.discord?.username
        ? await isInDiscord(privyUser.discord.username)
        : false;

      const hasCompletedProfile = completedProfile(privyUser);

      // The user is tier 0 and maintains its requirements
      if (nexusUser.tier === 0 && inDiscord) {
        // The user is tier 0 and exceeds the requirements
        if (active) {
          tx.update(nexus)
            .set({ tier: 1, updated: new Date() })
            .where(eq(nexus.user, nexusUser.user));

          await addRole(inDiscord, "challenger");
          await removeRole(inDiscord, "explorer");

          continue;
        }

        tx.update(nexus)
          .set({ updated: new Date() })
          .where(eq(nexus.user, nexusUser.user));

        continue;
      }

      // The user is tier 1 and maintains its requirements
      if (nexusUser.tier === 1 && active && inDiscord) {
        // The user is tier 1 and exceeds the requirements
        if (hasCompletedProfile) {
          tx.update(nexus)
            .set({ tier: 2, updated: new Date() })
            .where(eq(nexus.user, nexusUser.user));

          await addRole(inDiscord, "elite");
          await removeRole(inDiscord, "challenger");

          continue;
        }

        tx.update(nexus)
          .set({ updated: new Date() })
          .where(eq(nexus.user, nexusUser.user));
        continue;
      }

      // The user is tier 2 and maintains its requirements
      if (nexusUser.tier === 2 && active && inDiscord && hasCompletedProfile) {
        tx.update(nexus)
          .set({ updated: new Date() })
          .where(eq(nexus.user, nexusUser.user));
        continue;
      }

      const now = new Date();
      const lastUpdated = new Date(nexusUser.updated);
      const daysSinceUpdated = Math.ceil(
        Math.abs(now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Bump the user down to tier 0 if they haven't met the requirements in 30 days
      if (daysSinceUpdated > 30) {
        tx.update(nexus)
          .set({ tier: 0, updated: new Date(), active: !!inDiscord })
          .where(eq(nexus.user, nexusUser.user));
        continue;
      }

      // Wait half a second between each user to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });
}

async function wasActive(user: string, completedRounds: string[]) {
  const proposalActivity = await db.query.proposals.findMany({
    where: and(
      eq(proposals.user, user),
      inArray(proposals.round, completedRounds)
    ),
    columns: {
      id: true,
      round: true,
    },
  });

  const voteActivity = await db.query.votes.findMany({
    where: and(eq(votes.user, user), inArray(votes.round, completedRounds)),
    columns: {
      id: true,
      round: true,
    },
  });

  let roundsActive: string[] = [];

  for (const action of [...proposalActivity, ...voteActivity]) {
    if (roundsActive.includes(action.round)) {
      continue;
    }

    roundsActive.push(action.round);
  }

  if (roundsActive.length < 3) {
    return false;
  }

  return true;
}

async function isInDiscord(user: string) {
  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/search?query=${user}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  const members: any = await response.json();

  for (const member of members) {
    if (member.user.username === user.split("#")[0]) {
      return member.user.id as string;
    }
  }
}

function completedProfile(user: User) {
  if (!user.discord) {
    return false;
  }

  if (!user.twitter) {
    return false;
  }

  if (!user.farcaster) {
    return false;
  }

  if (!user.linkedAccounts.find((account) => account.type === "wallet")) {
    return false;
  }

  return true;
}

async function addRole(
  user: string,
  type: "explorer" | "challenger" | "elite"
) {
  await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${user}/roles/${type === "explorer" ? 1245110318603042950 : type === "challenger" ? 1245122417903534228 : 1245122576645361817}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        method: "PUT",
      },
    }
  );
}

async function removeRole(
  user: string,
  type: "explorer" | "challenger" | "elite"
) {
  await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${user}/roles/${type === "explorer" ? 1245110318603042950 : type === "challenger" ? 1245122417903534228 : 1245122576645361817}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        method: "DELETE",
      },
    }
  );
}
