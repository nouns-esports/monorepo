import createAchievement from "../createAchievement";

export const reachChallenger = createAchievement({
  name: "Reach Challenger",
  description: "Reach the Challenger rank",
  path: "nexus",
  next: "reachChampion",
  previous: "reachExplorer",
  image:
    "https://ipfs.nouns.gg/ipfs/QmbTy1UNeardoRz2iaWJSqXZ97bDqYxAtBa8KhZ1SJNw5S",
  xp: 100,
  check: async (user) => {
    if (user.nexus?.rank && [4, 5, 6].includes(user.nexus.rank.id)) {
      return true;
    }

    return false;
  },
});
