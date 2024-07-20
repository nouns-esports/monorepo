import { neynarClient } from "../clients/neynar";
import { unstable_cache as cache } from "next/cache";

export const communities = {
  nouns: {
    channels: ["nouns-esports", "nouncraft", "nounsfe"],
    image: "https://warpcast.com/~/channel-images/nouns.png",
    name: "Nouns",
    url: "https://warpcast.com/~/channel/nouns",
  },
  smash: {
    channels: ["smash"],
    image: "https://i.imgur.com/EORKiMw.png",
    name: "Smash",
    url: "https://warpcast.com/~/channel/smash",
  },
  dota: {
    channels: ["dota2"],
    image: "https://i.imgur.com/iw2cO2E.png",
    name: "Dota",
    url: "https://warpcast.com/~/channel/dota2",
  },
  cs: {
    channels: ["cs2"],
    image: "https://i.imgur.com/sZov7v0.png",
    name: "Counter-Strike",
    url: "https://warpcast.com/~/channel/cs2",
  },
  streetfighter: {
    channels: ["streetfighter"],
    image: "https://i.imgur.com/JFrMO5l.png",
    name: "Street Fighter",
    url: "https://warpcast.com/~/channel/streetfighter",
  },
  rocketleague: {
    channels: ["rocketleague"],
    image: "https://i.imgur.com/r1wIA3S.png",
    name: "Rocket League",
    url: "https://warpcast.com/~/channel/rocketleague",
  },
  valorant: {
    channels: ["valorant"],
    image: "https://i.imgur.com/hOyFJxh.png",
    name: "Valorant",
    url: "https://warpcast.com/~/channel/valorant",
  },
  league: {
    channels: ["league"],
    image: "https://i.imgur.com/jfNrXLT.pngg",
    name: "League of Legends",
    url: "https://warpcast.com/~/channel/leagueoflegends",
  },
};

export const getTrendingPosts = cache(
  async () => {
    //
    const posts = await neynarClient.fetchFeedByChannelIds(
      Object.values(communities)
        .map((community) => community.channels)
        .flat(),
      { limit: 50 }
    );
    return posts.casts;
  },
  ["discussion"],
  { tags: ["discussion"], revalidate: 60 * 10 }
);
