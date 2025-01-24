import {
	generateObject,
	generateText,
	type LanguageModelV1,
	type tool,
} from "ai";
import figlet from "figlet";
import colors from "kleur";

export type Config = {
	model: LanguageModelV1;
	character: {
		name: string;
		bio: string;
		lore?: string[];
	};
	tools?: Record<string, typeof tool>;
};

export async function createAgent(config: Config) {
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

	async function generateReply(prompt: string) {
		return generateText({
			model: config.model,
			prompt,
			system:
				"You are an agent with the following characteristics\n" +
				`Name: ${config.character.name}\n` +
				`Bio: ${config.character.bio}\n` +
				`Lore: ${config.character.lore?.join(" ")}\n`,
		}).then((res) => res.text);
	}

	async function shouldReply(prompt: string) {
		return generateObject({
			output: "enum",
			enum: ["yes", "no"],
			model: config.model,
			prompt: `Use your best judgement to decide if you should reply to this message: "${prompt}". You should not reply if it seems like they are responding to someone else and your input is not warranted.`,
		}).then((res) => res.object);
	}

	return {
		generateReply,
		shouldReply,
	};
}
