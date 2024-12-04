import type {
  ChatInputCommandInteraction,
  CommandInteraction,
  Interaction,
} from "discord.js";
import { validate } from "node-cron";

export function createCommand(command: {
  description: string;
  schedule?: string;
  then?: string;
  params?: Array<
    | {
        type: "string";
        name: string;
        description: string;
        choices?: Array<{ name: string; value: string }>;
        required: boolean;
      }
    | {
        type: "number" | "boolean";
        name: string;
        description: string;
        required: boolean;
      }
  >;
  onlyAdmin?: boolean;
  execute: (interaction?: CommandInteraction) => Promise<string>;
}) {
  if (command.schedule && !validate(command.schedule)) {
    throw new Error("Invalid cron expression");
  }

  return {
    description: command.description,
    schedule: command.schedule,
    then: command.then,
    params: command.params,
    onlyAdmin: !!command.onlyAdmin,
    execute: async (interaction?: CommandInteraction) => {
      let message = "";

      try {
        message = await command.execute(interaction);
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          return {
            message: e.message,
            success: false,
          };
        }
      }

      return { message, success: true };
    },
  };
}
