import { db, proposals, rounds, votes } from "~/packages/db/schema";
import { and, desc, eq, gt, inArray, lt } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import type { User } from "@privy-io/server-auth";
import { addRole, removeRole } from "../actions/manageRoles";

export const getNexus = cache(
  async (input: { user: User; discordId: string }) => {
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

    const [proposalActivity, voteActivity] = await Promise.all([
      db.query.proposals.findMany({
        where: and(
          eq(proposals.user, input.user.id),
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
          eq(votes.user, input.user.id),
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
        input.user.linkedAccounts.find((account) => account.type === "wallet")
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
  { tags: ["nexus"], revalidate: 60 * 60 * 24 }
);
