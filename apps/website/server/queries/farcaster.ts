import { unstable_cache as cache } from "next/cache";
import { neynarClient } from "../clients/neynar";

export const getFeed = cache(
	async (input: { fid?: number; channels?: string[] }) => {
		if (input.fid) {
			return (
				await neynarClient.fetchCastsForUser(input.fid, {
					limit: 25,
					includeReplies: false,
				})
			).casts;
		}

		if (input.channels) {
			const feed = await Promise.all(
				input.channels.map(
					async (channel) =>
						(
							await neynarClient.fetchFeed("filter", {
								filterType: "channel_id",
								channelId: channel,
								limit: 10,
								viewerFid: 11500,
							})
						).casts,
				),
			);

			return feed.flat();
		}

		throw new Error("Either user or channels must be provided");
	},
	["getFeed"],
	{ revalidate: 60 * 10 },
);

export const getCast = cache(
	async (input: { hash: string }) => {
		return (
			await neynarClient.fetchBulkCasts([input.hash], {
				viewerFid: 11500,
			})
		).result.casts[0];
	},
	["getCast"],
);
