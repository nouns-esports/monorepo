import { db, proposals, rounds, votes } from "~/packages/db/schema";
import { and, desc, eq, gt, inArray, lt, or } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import type { User, WalletWithMetadata } from "@privy-io/server-auth";
// import { addRole, removeRole } from "../actions/manageRoles";

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
  // Keo
  "153701297214849024": true,
  // MattTaylor
  "938952067656069151": true,
  // PumeyArts
  "402516115890372629": true,
  // Ben Latsko
  "837247961200459786": true,
};

export const getNexus = cache(
  async (input: { user: User; inServer: boolean }) => {
    if (!input.user.discord) return;

    if (elites[input.user.discord.subject]) {
      return {
        tier: "Elite",
        votes: 10,
      } as const;
    }

    if (challengers[input.user.discord.subject]) {
      return {
        tier: "Challenger",
        votes: 3,
      } as const;
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

    const wallet = input.user.linkedAccounts.find(
      (account) => account.type === "wallet"
    ) as WalletWithMetadata | undefined;

    const [proposalActivity, voteActivity] = await Promise.all([
      db.query.proposals.findMany({
        where: and(
          or(
            eq(proposals.user, input.user.id),
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
            eq(votes.user, input.user.id),
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
        input.user.discord &&
        input.user.twitter &&
        input.user.farcaster &&
        wallet
      ) {
        tier = "Elite";
      }
    }

    // The following is horrible design
    // await addRole({ user: input.discordId, role: tier });

    // if (tier === "Explorer") {
    //   await removeRole({ user: input.discordId, role: "Challenger" });
    //   await removeRole({ user: input.discordId, role: "Elite" });
    // }

    // if (tier === "Challenger") {
    //   await removeRole({ user: input.discordId, role: "Explorer" });
    //   await removeRole({ user: input.discordId, role: "Elite" });
    // }

    // if (tier === "Elite") {
    //   await removeRole({ user: input.discordId, role: "Explorer" });
    //   await removeRole({ user: input.discordId, role: "Challenger" });
    // }

    return {
      tier,
      votes: tier === "Explorer" ? 1 : tier === "Challenger" ? 3 : 10,
    } as const;
  },
  ["nexus"],
  { tags: ["nexus"], revalidate: 60 * 60 * 24 * 3 }
);
