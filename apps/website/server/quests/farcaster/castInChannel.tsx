import { neynarClient } from "@/server/clients/neynar";
import createAction from "../createAction";

export const castInChannel = createAction<{
	channel?: string;
	regex?: string;
	what?: string;
}>(async (actionInputs) => {
	if (!actionInputs.channel) {
		throw new Error("Channel input missing in action");
	}

	return {
		description: (
			<p>
				Cast {actionInputs.what ?? ""} in the{" "}
				<span className="text-red">/{actionInputs.channel}</span> channel
			</p>
		),
		url: `https://warpcast.com/~/channel/${actionInputs.channel}`,
		check: async (user) => {
			if (!actionInputs.channel) return false;

			if (!user.farcaster) return false;

			const regex = actionInputs.regex
				? new RegExp(actionInputs.regex)
				: undefined;

			const response = await neynarClient.fetchCastsForUser(
				user.farcaster.fid,
				{
					channelId: actionInputs.channel,
				},
			);

			if (response.casts.length === 0) return false;

			if (regex && !response.casts.some((cast) => regex.test(cast.text))) {
				return false;
			}

			return true;
		},
	};
});
