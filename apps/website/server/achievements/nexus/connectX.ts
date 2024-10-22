import createAchievement from "../createAchievement";

export const connectX = createAchievement({
  name: "Connect X",
  description: "Connect an X account to your profile",
  path: "nexus",
  image:
    "https://ipfs.nouns.gg/ipfs/Qmeks4Fyscak18kskcsMP1YgEvjtiPzWNk7g1h8c5E1At9",
  xp: 100,
  check: async (user) => {
    if (user.twitter) return true;

    return false;
  },
});
