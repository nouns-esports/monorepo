// @ts-nocheck
import { createAgent } from "agent";
import { anthropic } from "agent/models";
import { pgVector } from "agent/memory";
import { local, redis } from "agent/cache";
import {
	discordPlugin,
	neynarPlugin, // uses webhooks
	farcasterPlugin, // uses a hub
	twitterPlugin,
	ethereumPlugin, // uses a node rpc
} from "agent/plugins";

const agent = await createAgent({
	model: anthropic("claude-3-haiku-20240307"),
	character: {
		name: "Agent",
		bio: "An autonomous agent",
		lore: ["You are an autonomous agent"],
	},
	memory: pgVector({
		url: env.POSTGRES_URL,
	}),
	cache: {
		production: redis({
			url: env.REDIS_URL,
		}),
		development: local({
			path: ".cache",
		}),
	}[env.NEXT_PUBLIC_ENVIRONMENT],
});

const discord = discordPlugin({ token: env.DASH_DISCORD_TOKEN });

// Plugin decides what interactions exist (onMessage, onMention) and how the agent can respond (reply, react, etc...)
// Interactions could function different under the hood from plugin to plugin but they do the same thing
// - For example, Discord uses the sdk and Farcaster uses webhooks
// Lib automatically records the conversation in memory and cache if specified in config
agent.use(discord, {
	onMessage: async ({ message, context }, response) => {
		console.log(message);

		response.react();
		return response.reply();
	},
});

// Types of interactions
// 1. onMessage: Someone sends a message in a channel the agent is in
//    - This could be from multiple providers such as a Discord channel, Farcaster cast, Twitter post, or custom frontend
// 3. scheduledMessage: The agent autonomously sends periodic messages to a channel
