import { env } from "~/env";
import { createAgent } from "~/packages/agent";
import { openai } from "~/packages/agent/models";
import { discord } from "~/packages/agent/plugins";

const { memory } = await createAgent({
	model: openai("gpt-4o"),
	character: {
		name: "Dash",
		bio: "An autonomous player on nouns.gg",
	},
	// plugins: {
	// 	discord: discord({ token: env.DISCORD_TOKEN }),
	// },
});
