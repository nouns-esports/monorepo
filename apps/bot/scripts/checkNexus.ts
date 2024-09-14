import { db, proposals, rounds, votes } from "~/packages/db/schema";
import { discordClient, privyClient } from "../";
import { and, desc, eq, gt, inArray, lt, or } from "drizzle-orm";
import type { WalletWithMetadata } from "@privy-io/server-auth";
import { writeFileSync } from "fs";
import { env } from "~/env";

let output = "";

const users = await db.query.nexus.findMany();
const privyUsers = await privyClient.getUsers();

const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

for (const user of users) {
  try {
    const privyUser = privyUsers.find((u) => u.id === user.user);

    if (!privyUser?.discord) {
      continue;
    }

    try {
      await guild.members.fetch(privyUser.discord.subject);
    } catch (error) {
      continue;
    }

    console.log("Checking: ", privyUser.discord.username);

    const now = new Date();
    const threeMonthsAgo = new Date(
      now.getTime() - 1000 * 60 * 60 * 24 * 30 * 3
    );

    const completedRounds = await db.query.rounds.findMany({
      where: and(lt(rounds.end, now), gt(rounds.end, threeMonthsAgo)),
      orderBy: desc(rounds.end),
      columns: {
        id: true,
      },
    });

    const wallet = privyUser.linkedAccounts.find(
      (account) => account.type === "wallet"
    ) as WalletWithMetadata | undefined;

    const [proposalActivity, voteActivity] = await Promise.all([
      db.query.proposals.findMany({
        where: and(
          or(
            eq(proposals.user, user.user),
            wallet ? eq(proposals.user, wallet.address) : undefined
          ),
          inArray(
            proposals.round,
            completedRounds.map((r) => r.id)
          )
        ),
        columns: {
          id: true,
          round: true,
        },
      }),
      db.query.votes.findMany({
        where: and(
          or(
            eq(votes.user, user.user),
            wallet ? eq(votes.user, wallet.address) : undefined
          ),
          inArray(
            votes.round,
            completedRounds.map((r) => r.id)
          )
        ),
        columns: {
          id: true,
          round: true,
        },
      }),
    ]);

    const roundsActive: string[] = [];

    for (const action of [...proposalActivity, ...voteActivity]) {
      if (roundsActive.includes(action.round)) {
        continue;
      }

      roundsActive.push(action.round);
    }

    let tier: "Explorer" | "Challenger" | "Champion" = "Explorer";

    if (roundsActive.length >= 3) {
      tier = "Challenger";

      if (
        privyUser.discord &&
        privyUser.twitter &&
        privyUser.farcaster &&
        wallet
      ) {
        tier = "Champion";
      }
    }

    if (user.tier === tier) {
      continue;
    }

    if (tier === "Explorer") continue;

    if (user.tier === "Champion" && tier === "Challenger") {
      continue;
    }

    output += `${privyUser.discord.username},${tier}`;

    console.log("Updated: ", privyUser.discord.username, tier);
  } catch (error) {
    console.error(error);
  }
}

writeFileSync("newNexusUsers.csv", output);
console.log("Done");
