import createAchievement from "../createAchievement";

export const reachExplorer = createAchievement({
  name: "Reach Explorer",
  description: "Start your journey by placing into the Explorer rank",
  path: "nexus",
  next: "reachChallenger",
  image:
    "https://ipfs.nouns.gg/ipfs/QmRSvaTR55WMnjy6J4WDqYEkUSdffyd7gaaY2jm1mgVJmz",
  xp: 100,
  check: async (user) => {
    if (user.nexus?.rank && [1, 2, 3].includes(user.nexus.rank.id)) {
      return true;
    }

    return false;
  },
});
