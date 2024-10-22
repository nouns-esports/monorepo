import createAchievement from "../createAchievement";

export const reachChampion = createAchievement({
  name: "Reach Champion",
  description: "Reach the Champion rank",
  path: "nexus",
  previous: "reachChallenger",
  image:
    "https://ipfs.nouns.gg/ipfs/QmPfyBKcFsAEnJT4YfqRUf2qKCSXaaee1Ld9z99ZYetS8h",
  xp: 100,
  check: async (user) => {
    if (user.nexus?.rank && [7, 8, 9].includes(user.nexus.rank.id)) {
      return true;
    }

    return false;
  },
});
