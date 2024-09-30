import type { Interaction } from "discord.js";

export function createCommand(command: {
  description: string;
  schedule?: string;
  execute: (interaction: Interaction) => Promise<string>;
}) {
  return {
    description: command.description,
    schedule: command.schedule,
    execute: async (interaction: Interaction) => {
      let message = "";

      try {
        message = await command.execute(interaction);
      } catch (e) {
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
