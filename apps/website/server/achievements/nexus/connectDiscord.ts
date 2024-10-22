import createAchievement from "../createAchievement";

export const connectDiscord = createAchievement({
  name: "Connect Discord",
  description: "Connect a Discord account to your profile",
  path: "nexus",
  next: "joinServer",
  image:
    "https://ipfs.nouns.gg/ipfs/Qmdr53EbSCYs3jYod3NJF5PuTHF1tPW96bEYkK2z6Xc4yT",
  xp: 100,
  check: async (user) => {
    if (user.discord) return true;

    return false;
  },
});
