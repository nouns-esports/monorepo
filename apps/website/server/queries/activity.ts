import { db, proposals, votes } from "~/packages/db/schema";
import { desc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { getUser } from "./users";
import { userToProfile } from "@/utils/userToProfile";
import { randomInt } from "crypto";

export const getLatestActivity = cache(
  async () => {
    const [latestProposals, latestvotes] = await Promise.all([
      db.query.proposals.findMany({
        orderBy: desc(proposals.createdAt),
        limit: 25,
        with: {
          round: {
            columns: {
              id: true,
              image: true,
            },
          },
        },
        columns: {
          user: true,
          createdAt: true,
          round: true,
        },
      }),
      db.query.votes.findMany({
        orderBy: desc(votes.timestamp),
        limit: 25,
        with: {
          round: {
            columns: {
              id: true,
              image: true,
            },
          },
        },
        columns: {
          user: true,
          timestamp: true,
          round: true,
        },
      }),
    ]);

    const latestActivity = await Promise.all(
      [...latestProposals, ...latestvotes].map(async (activity) => {
        const timestamp =
          "timestamp" in activity
            ? activity.timestamp.toISOString()
            : activity.createdAt.toISOString();

        const user = await getUser({ id: activity.user });

        const profile = user ? userToProfile(user) : undefined;

        if (profile) {
          return {
            user: {
              pfp: profile.pfp,
              name: profile.name,
            },
            type: "timestamp" in activity ? "vote" : "proposal",
            timestamp,
            round: activity.round,
          };
        }
      })
    );

    // return latestActivity
    //   .filter((activity) => !!activity)
    //   .sort(
    //     (a, b) =>
    //       new Date(b.timestamp).getSeconds() -
    //       new Date(a.timestamp).getSeconds()
    //   );

    return [
      {
        user: {
          pfp: `https://api.cloudnouns.com/v1/pfp?text=${randomInt(100)}&background=1`,
          name: "Sasquatch",
        },
        type: "vote",
        timestamp: new Date().toISOString(),
        round: { id: "evo-2024", image: "/rounds/evo-2024/logo.jpg" },
      },
      {
        user: {
          pfp: `https://api.cloudnouns.com/v1/pfp?text=${randomInt(100)}&background=1`,
          name: "Sam",
        },
        type: "proposal",
        timestamp: new Date().toISOString(),
        round: { id: "nouncraft", image: "/rounds/nouncraft/logo.png" },
      },
      {
        user: {
          pfp: `https://api.cloudnouns.com/v1/pfp?text=${randomInt(100)}&background=1`,
          name: "Peter",
        },
        type: "proposal",
        timestamp: new Date().toISOString(),
        round: { id: "genesis-x", image: "/rounds/genesis-x/logo.png" },
      },
      {
        user: {
          pfp: `https://api.cloudnouns.com/v1/pfp?text=${randomInt(100)}&background=1`,
          name: "Mach",
        },
        type: "vote",
        timestamp: new Date().toISOString(),
        round: { id: "riptide-2024", image: "/rounds/riptide-2024/logo.png" },
      },
      {
        user: {
          pfp: `https://api.cloudnouns.com/v1/pfp?text=${randomInt(100)}&background=1`,
          name: "Gatsby",
        },
        type: "proposal",
        timestamp: new Date().toISOString(),
        round: { id: "evo-2024", image: "/rounds/evo-2024/logo.jpg" },
      },
    ];
  },
  ["activity"],
  { tags: ["activity"], revalidate: 30 }
);
