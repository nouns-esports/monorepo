import { neynarClient } from "@/server/clients/neynar";
import createAction from "../createAction";

export const castInChannel = createAction(async (actionInputs) => {
  if (!actionInputs?.channel) {
    throw new Error("Channel input missing in action");
  }

  return {
    description: (
      <p>
        Cast in the <span className="text-red">/{actionInputs.channel}</span>{" "}
        channel
      </p>
    ),
    url: `https://warpcast.com/~/channel/${actionInputs.channel}`,
    check: async (user) => {
      if (!user.farcaster) return false;

      const response = await neynarClient.fetchCastsForUser(
        user.farcaster.fid,
        {
          channelId: actionInputs.channel,
        }
      );

      if (response.casts.length === 0) return false;

      return true;
    },
  };
});
