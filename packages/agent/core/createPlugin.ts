import type { Hono } from "hono";
import type { Config, Interface } from "./createAgent";

export function createPlugin<T>(
	handler: (
		props: Interface & { config: Config<unknown>; server: Hono },
	) => Promise<T>,
) {
	return handler;
}
