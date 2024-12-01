import { createReplicator } from "./client";

const replicator = createReplicator("nemes.farcaster.xyz:2283", {
	onCastCreated: async (cast) => {
		if (cast.mentions.length > 0) {
			console.log(cast);
		}
	},
});
