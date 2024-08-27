import { neynarClient } from "@/server/clients/neynar";
import createAction from "../createAction";

export const followAccount = createAction(async (actionInputs) => {
  if (!actionInputs?.account) {
    throw new Error("Account input missing in action");
  }

  return {
    description: (
      <p>
        Follow <span className="text-red">@{actionInputs.account}</span>
      </p>
    ),
    url: `https://warpcast.com/${actionInputs.account}`,
    check: async (user) => {
      if (!user.farcaster) return false;

      const response = await neynarClient.fetchUserFollowers(
        actionInputs.account,
        {
          viewerFid: user.farcaster.fid,
          limit: 1,
        }
      );

      if (!response.result.users?.[0].viewerContext?.following) return false;

      return true;
    },
  };
});
