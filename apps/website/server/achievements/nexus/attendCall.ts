import createAchievement from "../createAchievement";

export const attendCall = createAchievement({
  name: "Attend a Contributor Call",
  description: "Attend the weekly Contributor Call in our Discord server",
  path: "nexus",
  previous: "joinServer",
  image:
    "https://ipfs.nouns.gg/ipfs/QmS654Bm585TcoJpF7DuL1FC7REb9ntxjJkmpWK2L6pEuZ",
  xp: 100,
  check: async (user) => {
    return false;
  },
});
