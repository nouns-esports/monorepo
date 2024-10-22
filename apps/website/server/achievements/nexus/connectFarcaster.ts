import createAchievement from "../createAchievement";

export const connectFarcaster = createAchievement({
  name: "Connect Farcaster",
  description: "Connect a Farcaster account to your profile",
  path: "nexus",
  image:
    "https://ipfs.nouns.gg/ipfs/QmRjMR3EPSWhvs92VQZFTNZGDf6x1t3R2HDACh99t7ctvY",
  xp: 100,
  check: async (user) => {
    if (user.farcaster) return true;

    return false;
  },
});
