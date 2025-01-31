import type { MessageContext } from "./createAgent";
// import { z } from "zod";
// <TSchema extends z.Schema | undefined>

export function createTool(params: {
	description: string;
	// parameters?: TSchema;
	execute: (
		context: MessageContext,
		// parameters: TSchema extends z.Schema ? z.infer<TSchema> : undefined,
	) => Promise<void>;
}) {
	return params;
}
