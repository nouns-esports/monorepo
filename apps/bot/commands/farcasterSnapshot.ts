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

		const casters = new Set<number>();
		const likers = new Set<number>();
		const recasters = new Set<number>();

		for (const channel of [
			"dota2",
			"cs2",
			"smash",
			"nouns-esports",
			"nounsfe",
		]) {
			let cursor: string | undefined | null = undefined;
			let latestTimestamp = now;

			while (latestTimestamp > yesterday && cursor !== null) {
				const casts = await neynarClient.fetchFeedByChannelIds([channel], {
					withRecasts: false,
					withReplies: true,
					membersOnly: true,
					limit: 10,
					cursor,
				});

				cursor = casts.next.cursor;

				for (const cast of casts.casts) {
					const timestamp = new Date(cast.timestamp);
					latestTimestamp = timestamp;
					if (timestamp < yesterday) continue;

					casters.add(cast.author.fid);

					for (const like of cast.reactions.likes) {
						likers.add(like.fid);
					}

					for (const recast of cast.reactions.recasts) {
						recasters.add(recast.fid);
					}
				}

				console.log(
					channel,
					`Casters: ${casters.size}`,
					`Likers: ${likers.size}`,
					`Recasters: ${recasters.size}`,
				);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		const incentives: Record<number, number | undefined> = {};

		for (const caster of casters) {
			incentives[caster] = (incentives[caster] ?? 0) + 100;
		}

		for (const recaster of recasters) {
			incentives[recaster] = (incentives[recaster] ?? 0) + 75;
		}

		for (const liker of likers) {
			incentives[liker] = (incentives[liker] ?? 0) + 25;
		}

		// const users = await db.query.nexus.findMany({
		//   where: inArray(nexus.farcaster.fid, Object.keys(incentives)),
		// });

		console.log("finished", incentives);

		return "Snapshot created successfully";
	},
});
