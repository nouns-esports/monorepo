import { Hono } from "hono";
import { get } from "js-runtime";

export async function startServer(options: { port: number }) {
	const runtime = get();

	const app = new Hono();
	app.get("/", (c) => c.text("Honooo!"));

	if (runtime === "node") {
		const { serve } = await import("@hono/node-server");

		return serve({
			fetch: app.fetch,
			port: options.port,
		});
	}

	if (runtime === "bun") {
		return Bun.serve({
			fetch: app.fetch,
			port: options.port,
		});
	}

	throw new Error("Unsupported runtime");
}
