import { neynarClient } from "@/server/clients/neynar";
import createAction from "../createAction";

export const followChannel = createAction(async (actionInputs) => {
  if (!actionInputs?.channel) {
    throw new Error("Channel input missing in action");
  }

  return {
    description: (
      <p>
        Follow the <span className="text-red">/{actionInputs.channel}</span>{" "}
        channel
      </p>
    ),
    url: `https://warpcast.com/~/channel/${actionInputs.channel}`,
    check: async (user) => {
      if (!user.farcaster) return false;

      const response = await neynarClient.fetchBulkChannels(
        [actionInputs.channel],
        {
          viewerFid: user.farcaster.fid,
        }
      );

      if (!response.channels?.[0].viewer_context?.following) return false;

      return true;
    },
  };
});
