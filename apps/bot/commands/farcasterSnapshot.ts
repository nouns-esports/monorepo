import { createCommand } from "../createCommand";
import { neynarClient } from "../index";

export const farcasterSnapshot = createCommand({
  description: "Creates a snapshot of Farcasters in channels",
  params: [
    {
      type: "string",
      name: "tag",
      description: "Give the snapshot a tag",
      required: false,
    },
  ],
  onlyAdmin: true,
  execute: async () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const activeCasters = new Set<number>();

    for (const channel of [
      // "dota", "cs", "smash",
      "nouns-esports",
    ]) {
      let cursor: string | undefined | null = undefined;
      let latestTimestamp = now;

      while (latestTimestamp > yesterday && cursor !== null) {
        const casts = await neynarClient.fetchFeedByChannelIds([channel], {
          withRecasts: false,
          withReplies: false,
          membersOnly: true,
          limit: 10,
          cursor,
        });

        cursor = casts.next.cursor;

        for (const cast of casts.casts) {
          const timestamp = new Date(cast.timestamp);
          if (timestamp < yesterday) continue;
          latestTimestamp = timestamp;

          activeCasters.add(cast.author.fid);
        }

        console.log(
          `Fetched ${casts.casts.length} casts from ${channel}. Waiting...`
        );
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }

    return "Snapshot created successfully";
  },
});
