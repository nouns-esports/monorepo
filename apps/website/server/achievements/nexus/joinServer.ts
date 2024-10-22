import createAchievement from "../createAchievement";

export const joinServer = createAchievement({
  name: "Join the Discord Server",
  description: "Join our community Discord server",
  path: "nexus",
  next: "attendCall",
  previous: "connectDiscord",
  image:
    "https://ipfs.nouns.gg/ipfs/QmeEab8zrjsY7gPw4CEqTLxmdVck3JvhrskuJDRegvsMh3",
  xp: 100,
  check: async (user) => {
    return false;
  },
});
