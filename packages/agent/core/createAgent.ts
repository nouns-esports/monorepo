import {
	generateObject,
	generateText,
	type LanguageModelV1,
	type tool,
} from "ai";
import figlet from "figlet";
import colors from "kleur";
import type { createPlugin } from "./createPlugin";
import { createServer } from "./createServer";

export type Config<TPlugins> = {
	model: LanguageModelV1;
	character: {
		name: string;
		bio: string;
		lore?: string[];
	};
	plugins?: TPlugins;
	onMessage?: (message: {
		provider: keyof TPlugins;
		context?: MessageContext;
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
	}) => Promise<string | string[] | void>;
	memory?: any;
	server?: {
		port: number;
	};
};

type MessageContext = {
	id: string;
	// This will likely need to be more robust. Differnt plugins might need access to different identifiers of an author (for example, backend id, username, display name, handle, etc...)
	author: string;
	room: string;
	mentions?: string[];
	embeds?: string[];
};

export type Interface = {
	scheduleTask: () => void;
	addTool: () => void;
	addMemory: () => void;
	generateReply: (
		prompt: string,
		context?: MessageContext,
	) => ReturnType<typeof generateText>;
};

export async function createAgent<
	TPlugins extends Record<string, ReturnType<typeof createPlugin>>,
>(config: Config<TPlugins>) {
	console.log(
		figlet.textSync(config.character.name, {
			font: "ANSI Shadow",
			horizontalLayout: "default",
			verticalLayout: "default",
			width: 80,
			whitespaceBreak: true,
		}),
	);
	console.log(colors.blue(config.character.bio));

	const { server, start } = await createServer(config);

	async function scheduleTask() {}
	async function addTool() {}
	async function addMemory() {}
	async function generateReply(prompt: string, context?: MessageContext) {
		const developerContext = await config.onMessage?.({
			provider: "discord",
			context,
		});

		const reply = await generateText({
			model: config.model,
			prompt,
			system:
				"You are an agent with the following characteristics.\n" +
				`Name: ${config.character.name}\n` +
				`Bio: ${config.character.bio}\n` +
				`Lore: ${config.character.lore?.join(" ")}\n` +
				(context || developerContext
					? "Additional context relevant to this prompt.\n"
					: "") +
				(context
					? "Provider: discord\n" +
						`Author: ${context.author}\n` +
						`Room: ${context.room}\n`
					: "") +
				(developerContext
					? Array.isArray(developerContext)
						? developerContext.join("\n")
						: developerContext
					: ""),
		});

		return reply;
	}

	const plugins = {} as {
		[K in keyof TPlugins]: Awaited<ReturnType<TPlugins[K]>>;
	};

	if (config.plugins) {
		for (const [id, register] of Object.entries(config.plugins)) {
			const result = await register({
				config,
				server,
				scheduleTask,
				addTool,
				addMemory,
				generateReply,
			});

			plugins[id as keyof TPlugins] = result as Awaited<
				ReturnType<TPlugins[keyof TPlugins]>
			>;
		}
	}

	// await start();
	// console.log(
	// 	`Server running at http://localhost:${config.server?.port ?? 8787}`,
	// );

	return {
		server,
		plugins,
		scheduleTask,
		addTool,
		addMemory,
		generateReply,
	};
}
