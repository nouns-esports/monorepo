import type { AuthenticatedUser } from "./users";
import { unstable_cache as cache } from "next/cache";
import { db, xp } from "~/packages/db/schema";
import { and, eq, inArray } from "drizzle-orm";

// export const achievements = {
//   connectDiscord,
//   connectFarcaster,
//   connectX,
//   joinServer,
//   connectWallet,
//   attendCall,
//   reachExplorer,
//   reachChallenger,
//   reachChampion,
// };

// export const getUserAchievements = cache(
//   async (input: { user: AuthenticatedUser }) => {
//     const claimed = await db.query.xp.findMany({
//       where: and(
//         eq(xp.user, input.user.id),
//         inArray(xp.achievement, Object.keys(achievements))
//       ),
//       columns: {
//         achievement: true,
//       },
//     });

//     let userAchievements: Record<
//       string,
//       ReturnType<typeof createAchievement> & {
//         claimed: boolean;
//         completed: boolean;
//       }
//     > = {};

//     await Promise.all(
//       Object.entries(achievements).map(async ([id, achievement]) => {
//         if (claimed.find((record) => record.achievement === id)) {
//           return (userAchievements[id] = {
//             ...achievement,
//             claimed: true,
//             completed: true,
//           });
//         }

//         if (await achievement.check(input.user)) {
//           return (userAchievements[id] = {
//             ...achievement,
//             claimed: false,
//             completed: true,
//           });
//         }

//         return (userAchievements[id] = {
//           ...achievement,
//           claimed: false,
//           completed: false,
//         });
//       })
//     );

//     return userAchievements;
//   },
//   ["getUserAchievements"],
//   { tags: ["getUserAchievements"], revalidate: 60 * 10 }
// );

export type Achievement = {
  id: string;
  name: string;
  description: string;
  image: string;
  xp: number;
  check: (user: AuthenticatedUser) => Promise<boolean>;
  next?: Achievement | Achievement[];
};

export const achievements = {
  id: "enter-nexus",
  name: "Enter the Nexus",
  description: "Begin your Nouns Esports journey",
  image: "/logo/logo-square.png",
  xp: 0,
  check: async (user: AuthenticatedUser) => {
    if (user.nexus) return true;
    return false;
  },
  next: [
    {
      id: "connect-farcaster",
      name: "Connect Farcaster",
      description: "Connect a Farcaster account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/QmRjMR3EPSWhvs92VQZFTNZGDf6x1t3R2HDACh99t7ctvY",
      xp: 100,
      check: async (user) => {
        if (user.farcaster) return true;

        return false;
      },
    },
    {
      id: "connect-discord",
      name: "Connect Discord",
      description: "Connect a Discord account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/Qmdr53EbSCYs3jYod3NJF5PuTHF1tPW96bEYkK2z6Xc4yT",
      xp: 100,
      check: async (user) => {
        if (user.discord) return true;

        return false;
      },
      next: {
        id: "join-server",
        name: "Join the Discord Server",
        description: "Join our community Discord server",
        image:
          "https://ipfs.nouns.gg/ipfs/QmeEab8zrjsY7gPw4CEqTLxmdVck3JvhrskuJDRegvsMh3",
        xp: 100,
        check: async (user) => {
          return false;
        },
        next: {
          id: "attend-call",
          name: "Attend a Contributor Call",
          description:
            "Attend the weekly Contributor Call in our Discord server",
          image:
            "https://ipfs.nouns.gg/ipfs/QmS654Bm585TcoJpF7DuL1FC7REb9ntxjJkmpWK2L6pEuZ",
          xp: 100,
          check: async (user) => {
            return false;
          },
        },
      },
    },
    {
      id: "connect-wallet",
      name: "Connect Wallet",
      description: "Connect a wallet to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/QmQxxdw7GqszLAZ6HqR8FWv5Lva9qq7iD3mT1bdCp2aPE3",
      xp: 100,
      check: async (user) => {
        if (user.wallet) return true;

        return false;
      },
    },

    {
      id: "create-proposal",
      name: "Create your first Proposal",
      description: "Create your first proposal",
      image:
        "https://ipfs.nouns.gg/ipfs/QmZXCtrxYvMhMDuryUhTiQYA85vkEhFdcLHbUrLZFsV1wK",
      xp: 100,
      check: async (user) => {
        return false;
      },
      next: [
        {
          id: "get-a-vote",
          name: "Get a vote on your proposal",
          description: "Get a vote on your proposal",
          image:
            "https://ipfs.nouns.gg/ipfs/QmYveqUvMiMFcqWXN1yGWKZv9jT4fujiZCM6Bij1cWuNhV",
          xp: 100,
          check: async (user) => {
            return false;
          },
          next: {
            id: "10-voters",
            name: "Get votes from 10 unique voters on a single proposal",
            description: "Get votes from 10 unique voters on a single proposal",
            image:
              "https://ipfs.nouns.gg/ipfs/QmZZsQGVMqd1znAPzXTv8aSJLZc8V5dtn9RiBpNMEH88Sz",
            xp: 100,
            check: async (user) => {
              return false;
            },
          },
        },
        {
          id: "win-a-round",
          name: "Win a round",
          description: "Win a round",
          image:
            "https://ipfs.nouns.gg/ipfs/QmUmmd9xzDZWgvkhtNjiyTBtwDgP491caZcpe9F3wcSzxW",
          xp: 100,
          check: async (user) => {
            return false;
          },
          next: {
            id: "place-1st",
            name: "Place 1st in a round",
            description: "Place 1st in a round",
            image:
              "https://ipfs.nouns.gg/ipfs/QmdEiVsfSwWiDvKafCWv1nkFeZBVUCY3Bcef4zdq641p2X",
            xp: 100,
            check: async (user) => {
              return false;
            },
          },
        },
      ],
    },

    {
      id: "connect-x",
      name: "Connect X",
      description: "Connect an X account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/Qmeks4Fyscak18kskcsMP1YgEvjtiPzWNk7g1h8c5E1At9",
      xp: 100,
      check: async (user) => {
        if (user.twitter) return true;

        return false;
      },
    },
    {
      id: "reach-explorer",
      name: "Reach Explorer",
      description: "Reach the Explorer rank",
      image:
        "https://ipfs.nouns.gg/ipfs/QmRSvaTR55WMnjy6J4WDqYEkUSdffyd7gaaY2jm1mgVJmz",
      xp: 100,
      check: async (user) => {
        if (user.nexus?.rank && [1, 2, 3].includes(user.nexus.rank.id)) {
          return true;
        }

        return false;
      },
      next: {
        id: "reach-challenger",
        name: "Reach Challenger",
        description: "Reach the Challenger rank",
        image:
          "https://ipfs.nouns.gg/ipfs/QmbTy1UNeardoRz2iaWJSqXZ97bDqYxAtBa8KhZ1SJNw5S",
        xp: 100,
        check: async (user) => {
          if (user.nexus?.rank && [4, 5, 6].includes(user.nexus.rank.id)) {
            return true;
          }

          return false;
        },
        next: {
          id: "reach-champion",
          name: "Reach Champion",
          description: "Reach the Champion rank",
          image:
            "https://ipfs.nouns.gg/ipfs/QmPfyBKcFsAEnJT4YfqRUf2qKCSXaaee1Ld9z99ZYetS8h",
          xp: 100,
          check: async (user) => {
            if (user.nexus?.rank && [7, 8, 9].includes(user.nexus.rank.id)) {
              return true;
            }

            return false;
          },
        },
      },
    },
    {
      id: "complete-quest",
      name: "Complete your first Quest",
      description: "Complete your first quest",
      image:
        "https://ipfs.nouns.gg/ipfs/QmUdsi8KvvFyQVvk4FrzE5u2856pW7gw3t8yPLYvTrE54n",
      xp: 100,
      check: async (user) => {
        return false;
      },
    },
    {
      id: "cast-vote",
      name: "Cast your first Vote",
      description: "Cast your first vote on a proposal",
      image:
        "https://ipfs.nouns.gg/ipfs/QmQgZf1f7orqjeRpNCgNGTFBhshDdX3mUMZubeN5CVdQVR",
      xp: 100,
      check: async (user) => {
        return false;
      },
      next: {
        id: "cast-vote-winning-proposal",
        name: "Cast a vote on a winning proposal",
        description:
          "Cast a vote on a proposal that ended up winning the round",
        image:
          "https://ipfs.nouns.gg/ipfs/QmZ9h5CSssYyVqmDA8r4zVFyXY4KkK9EdhCxfhJEPiv7Rx",
        xp: 100,
        check: async (user) => {
          return false;
        },
      },
    },
  ],
} satisfies Achievement;

async function getAchievements(input: { user?: AuthenticatedUser }) {
  // get claimed xp from achievements
  // recursively check all achievements if user is provided
  // completed = true if claimed = true
  // can only claim in order
  return {
    id: "enterNexus",
    name: "Enter the Nexus",
    description: "Begin your Nouns Esports journey",
    image: "",
    claimed: false,
    completed: false,
    next: {
      id: "connectWallet",
      name: "Connect a wallet",
    },
  };
}
