import { db, nexus, proposals, rounds, votes } from "~/packages/db/schema";
import { discordClient, privyClient, rest } from "..";
import { and, desc, eq, gt, inArray, lt, or } from "drizzle-orm";
import type { WalletWithMetadata } from "@privy-io/server-auth";
import { env } from "~/env";
import { GuildMember, Routes } from "discord.js";

const roles = {
  Explorer: "1245110318603042950",
  Challenger: "1245122417903534228",
  Elite: "1245122576645361817",
  // Test roles
  // Elite: "1253532214784819240",
  // Challenger: "1253778440100909118",
  // Explorer: "1253778462511202365",
} as const;

const elites: Record<string, boolean> = {
  // Peter
  "135377635168616448": true,
  // Sam
  "174640628456620032": true,
  // Sasquatch
  "95704393151680512": true,
  // Gatsby
  "239409933466992641": true,
  // Chan
  "147996270097596416": true,
  // Ohan
  "835989319701233704": true,
  // Pat
  "116974832247111689": true,
  // Oni
  "162709914966294528": true,
  // Mach
  "507035501576847361": true,
  // Mike
  "230522416571482112": true,
  // Gunnar
  "98915589824720896": true,
  // Lelis
  "145597126812893184": true,
  // Tal
  "167973568422871041": true,
  // Yuma
  "226553021813751808": true,
  // Copy
  "252141512131870720": true,
  // Adren
  "131301664152879106": true,
  // Carson
  "135599935402803201": true,
  // CJ
  "544147832698044416": true,
  // Jeorge
  "176812686368047104": true,
  // Junior
  "180486076773695490": true,
  // Rush
  "154891812115447808": true,
  // Semphis
  "175510055800537088": true,
  // Taki
  "434447978602692608": true,
  // Salt
  "275164459289411585": true,
  // AKlo
  "405120207300853761": true,
  // Cody
  "209462125968490496": true,
  // Smug
  "329493563308113920": true,
  // Jesscas
  "139946879403163648": true,
  // Lunari
  "1089081542799802368": true,
  // Ashe
  "184466373420908544": true,
  // Onter
  "224661017739788290": true,
  // Katalyst
  "254672814798405642": true,
  // Adesu
  "103629588353007616": true,
  // Blaine
  "230377318407733248": true,
  // Bruv
  "237275237299912704": true,
  // ToonSlim
  "117388754368331779": true,
  // Ghatlue
  "286483887390195714": true,
  // Keo
  "153701297214849024": true,
};

const challengers: Record<string, boolean> = {
  // Chaler
  "205749146173308928": true,
  // Paladin
  "153694306719367169": true,
  // Max
  "223396766920212481": true,
  // Happymealz
  "132635343219326977": true,
  // Zaferino
  "162236149048410112": true,
  // Hamtarro
  "177843705619677185": true,
  // MattTaylor
  "938952067656069151": true,
  // PumeyArts
  "402516115890372629": true,
  // Ben Latsko
  "837247961200459786": true,
};

export async function refreshNexus() {
  try {
    const users = await db.query.nexus.findMany();

    const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

    await db.transaction(async (tx) => {
      for (const user of users) {
        const privyUser = await privyClient.getUser(user.user);
        if (!privyUser.discord) {
          await tx.delete(nexus).where(eq(nexus.user, user.user));
          continue;
        }

        try {
          await guild.members.fetch(privyUser.discord.subject);
        } catch (error) {
          await tx.delete(nexus).where(eq(nexus.user, user.user));
          continue;
        }

        if (elites[privyUser.discord.subject]) {
          await toggleRole(privyUser.discord.subject, "Elite");
          await tx
            .update(nexus)
            .set({ tier: "Elite" })
            .where(eq(nexus.user, user.user));

          continue;
        }

        if (challengers[privyUser.discord.subject]) {
          await toggleRole(privyUser.discord.subject, "Challenger");
          await tx
            .update(nexus)
            .set({ tier: "Challenger" })
            .where(eq(nexus.user, user.user));

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

        let tier: "Explorer" | "Challenger" | "Elite" = "Explorer";

        if (roundsActive.length >= 3) {
          tier = "Challenger";

          if (
            privyUser.discord &&
            privyUser.twitter &&
            privyUser.farcaster &&
            wallet
          ) {
            tier = "Elite";
          }
        }

        await toggleRole(privyUser.discord.subject, tier);
        await tx.update(nexus).set({ tier }).where(eq(nexus.user, user.user));

        console.log("Updated: ", privyUser.discord.subject, tier);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    });
  } catch (error) {
    return error as Error;
  }
}

async function toggleRole(
  user: string,
  role: "Explorer" | "Challenger" | "Elite"
) {
  await addRole({ user, role });

  if (role === "Explorer") {
    await removeRole({ user, role: "Challenger" });
    await removeRole({ user, role: "Elite" });
  }

  if (role === "Challenger") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Elite" });
  }

  if (role === "Elite") {
    await removeRole({ user, role: "Explorer" });
    await removeRole({ user, role: "Challenger" });
  }
}

async function addRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Elite";
}) {
  return rest.put(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, roles[input.role])
  );
}

async function removeRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Elite";
}) {
  return rest.delete(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, roles[input.role])
  );
}
