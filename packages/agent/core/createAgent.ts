import type { createPlugin } from "./createPlugin";
import type { LanguageModelV1, tool } from "ai";

import figlet from "figlet";
import kleur from "kleur";
import { createSpinner } from "nanospinner";
import { startServer } from "./server";

const state = createSpinner();

export async function createAgent(config: {
	model: LanguageModelV1;
	character: {
		name: string;
		bio: string;
		lore?: string[];
		knowledge?: string[];
	};
	plugins?: Record<string, ReturnType<ReturnType<typeof createPlugin>>>;
	tools?: Record<string, typeof tool>;
	server?: {
		port?: number;
	};
}) {
	console.log(
		figlet.textSync(config.character.name, {
			font: "ANSI Shadow",
			horizontalLayout: "default",
			verticalLayout: "default",
			width: 80,
			whitespaceBreak: true,
		}),
	);
	console.log(kleur.blue(config.character.bio));
	state.start({ text: "Starting agent..." });
	await startServer({ port: config.server?.port ?? 8787 });
	state.success({
		text: `Agent running on ${kleur.green(`http://localhost:${config.server?.port ?? 8787}`)}`,
	});
	state.start({ text: "Waiting for messages..." });

	return {
		memory: {
			add: (text: string) => {},
		},
		plugins: config.plugins,
		tools: config.tools,
	};
}
