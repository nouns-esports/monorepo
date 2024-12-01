import {
	type Embed,
	getSSLHubRpcClient,
	type HubEvent,
	HubEventType,
} from "@farcaster/hub-nodejs";

const channels: Record<string, string | undefined> = {
	"https://nouns.gg": "nouns-esports",
	"https://warpcast.com/~/channel/rocketleague": "rocketleague",
	"https://warpcast.com/~/channel/cs2": "cs2",
	"https://warpcast.com/~/channel/dota": "dota",
	"https://warpcast.com/~/channel/smash": "smash",
	"chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61": "memes",
};

export async function createReplicator(
	hub: string,
	callbacks: {
		onCastCreated?: (cast: {
			hash: string;
			fid: number;
			timestamp: number;
			text: string;
			channel?: string;
			embeds: Embed[];
			mentions: number[];
			mentionsPositions: number[];
		}) => Promise<void>;
		onCastDeleted?: (cast: { hash: string }) => Promise<void>;
		onReactionAdded?: (reaction: {
			type: "like" | "recast";
			fid: number;
			timestamp: number;
			cast: string;
		}) => Promise<void>;
		onReactionRemoved?: (reaction: {
			type: "like" | "recast";
			fid: number;
			cast: string;
		}) => Promise<void>;
	},
) {
	const SSLHubRpcClient = getSSLHubRpcClient(hub);

	const streams = await SSLHubRpcClient.subscribe({
		eventTypes: [HubEventType.MERGE_MESSAGE],
	});

	streams.asyncMap(async (stream) => {
		stream.on("data", (event: HubEvent) => {
			const message = event.mergeMessageBody?.message;

			if (message?.data) {
				if (message.data.type === 1 && "castAddBody" in message.data) {
					if (callbacks.onCastCreated) {
						callbacks.onCastCreated({
							hash: message.hash.toString(),
							fid: message.data.fid,
							timestamp: message.data.timestamp,
							text: message.data.castAddBody?.text ?? "",
							channel: channels[message.data.castAddBody?.parentUrl ?? ""],
							embeds: message.data.castAddBody?.embeds ?? [],
							mentions: message.data.castAddBody?.mentions ?? [],
							mentionsPositions:
								message.data.castAddBody?.mentionsPositions ?? [],
						});
					}
				}

				if (message.data.type === 2 && "castRemoveBody" in message.data) {
					if (callbacks.onCastDeleted) {
						callbacks.onCastDeleted({
							hash: message.hash.toString(),
						});
					}
				}

				if (message.data.type === 3 && "reactionBody" in message.data) {
					if (callbacks.onReactionAdded) {
						callbacks.onReactionAdded({
							type: message.data.reactionBody?.type === 1 ? "like" : "recast",
							fid: message.data.fid,
							timestamp: message.data.timestamp,
							cast: message.hash.toString(),
						});
					}
				}

				if (message.data.type === 4 && "reactionBody" in message.data) {
					if (callbacks.onReactionRemoved) {
						callbacks.onReactionRemoved({
							type: message.data.reactionBody?.type === 1 ? "like" : "recast",
							fid: message.data.fid,
							cast: message.hash.toString(),
						});
					}
				}
			}
		});
	});
}
