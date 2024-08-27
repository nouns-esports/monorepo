import { neynarClient } from "../clients/neynar";
import { unstable_cache as cache } from "next/cache";

export const getTrendingPosts = cache(
  async () => {
    const responses = await Promise.all([
      neynarClient.fetchFeed("filter", {
        limit: 100,
        filterType: "channel_id",
        channelId: "nouns-esports",
      }),
      neynarClient.fetchFeed("filter", {
        limit: 100,
        filterType: "channel_id",
        channelId: "cs2",
      }),
      neynarClient.fetchFeed("filter", {
        limit: 100,
        filterType: "channel_id",
        channelId: "smash",
      }),
      neynarClient.fetchFeed("filter", {
        limit: 100,
        filterType: "channel_id",
        channelId: "dota2",
      }),
    ]);

    const posts = responses.map((response) => response.casts.flat()).flat();

    let channelCount: Record<string, number> = {};

    const filtered = posts
      .filter((post) => {
        if (post.text.length < 1) return false;
        if (!post.channel) return false;

        channelCount[post.channel.id] = ++channelCount[post.channel.id] || 0;

        if (channelCount[post.channel.id] > 10) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.reactions.likes_count - a.reactions.likes_count);

    return filtered;
  },
  ["discussion"],
  { tags: ["discussion"], revalidate: 60 * 10 }
);
