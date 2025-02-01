import type { Hono } from "hono";
import type { Config, Tool, MessageContext } from "./createAgent";
import type { generateText } from "ai";

export function createPlugin<T>(
	handler: (props: {
		scheduleTask: () => void;
		addTool: (params: Omit<Tool<string>, "providers">) => void;
		addMemory: () => void;
		generateReply: (
			prompt: string,
			context: Omit<MessageContext<string>, "provider">,
		) => ReturnType<typeof generateText>;
		config: Config<unknown>;
		server: Hono;
	}) => Promise<T>,
) {
	return handler;
}
