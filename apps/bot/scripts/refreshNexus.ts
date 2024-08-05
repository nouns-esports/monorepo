import { db, nexus, proposals, rounds, votes } from "~/packages/db/schema";
import { discordClient, privyClient, rest } from "../";
import { and, desc, eq, gt, inArray, lt, or } from "drizzle-orm";
import type { WalletWithMetadata } from "@privy-io/server-auth";
import { env } from "~/env";
import { Routes } from "discord.js";

const roles = {
  Explorer: "1245110318603042950",
  Challenger: "1245122417903534228",
  Champion: "1245122576645361817",
  // Test roles
  // Champion: "1253532214784819240",
  // Challenger: "1253778440100909118",
  // Explorer: "1253778462511202365",
} as const;

export async function refreshNexus() {
  console.log("refreshing nexus");

  const users = await db.query.nexus.findMany();

  const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

  await db.transaction(async (tx) => {
    for (const user of users) {
      try {
        const privyUser = await privyClient.getUser(user.user);

        if (!privyUser.discord) {
          continue;
        }

        try {
          await guild.members.fetch(privyUser.discord.subject);
        } catch (error) {
          continue;
        }

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
          // if (roundsActive.length >= 5 && wallet) {
          //   tier = "Champion";
          // }
        }

        if (user.tier === tier) {
          continue;
        }

        await toggleRole(privyUser.discord.subject, tier);
        await tx.update(nexus).set({ tier }).where(eq(nexus.user, user.user));

        console.log("Updated: ", privyUser.discord.username, tier);
        await new Promise((resolve) => setTimeout(resolve, 250));
      } catch (error) {
        console.error(error);
      }
    }
  });

  console.log("Done refreshing nexus");
}

async function toggleRole(
  user: string,
  role: "Explorer" | "Challenger" | "Champion"
) {
  await addRole({ user, role });

  if (role === "Explorer") {
    await removeRole({ user, role: "Challenger" });
    await removeRole({ user, role: "Champion" });
  }

  if (role === "Challenger") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Champion" });
  }

  if (role === "Champion") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Challenger" });
  }
}

async function addRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Champion";
}) {
  return rest.put(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, roles[input.role])
  );
}

async function removeRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Champion";
}) {
  return rest.delete(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, roles[input.role])
  );
}
