import createAchievement from "../createAchievement";

export const connectWallet = createAchievement({
  name: "Connect Wallet",
  description: "Connect a wallet to your profile",
  path: "nexus",
  image:
    "https://ipfs.nouns.gg/ipfs/QmQxxdw7GqszLAZ6HqR8FWv5Lva9qq7iD3mT1bdCp2aPE3",
  xp: 100,
  check: async (user) => {
    if (user.wallet) return true;

    return false;
  },
});
