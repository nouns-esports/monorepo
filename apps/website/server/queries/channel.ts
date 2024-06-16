import { neynarClient } from "../clients/neynar";
import { unstable_cache as cache } from "next/cache";
export const channels = [
  "nouns-esports",
  "nouns",
  "smash",
  "dota2",
  "cs2",
  "streetfighter",
  "rocketleague",
  "valorant",
  "league",
];

export const getChannels = cache(
  async () => {
    //ko
    return (await neynarClient.fetchBulkChannels(channels)).channels;
  },
  ["channels"],
  { tags: ["channels"], revalidate: 60 * 10 }
);

export const getChannel = cache(
  async (input: { channel: string }) => {
    return (await neynarClient.lookupChannel(input.channel)).channel;
  },
  ["channel"],
  { tags: ["channel"], revalidate: 60 * 10 }
);

export const getFeed = cache(
  async (input: { channel: string }) => {
    return (
      await neynarClient.fetchFeed("filter", {
        filterType: "channel_id",
        channelId: input.channel,
        limit: 25,
      })
    ).casts;
  },
  ["feed"],
  { tags: ["feed"], revalidate: 60 * 10 }
);
