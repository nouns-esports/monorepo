import { env } from "~/env";
import { Client, REST, Role, Routes, SlashCommandBuilder } from "discord.js";
import { PrivyClient } from "@privy-io/server-auth";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

// Commands
import { createSnapshot } from "./commands/createSnapshot";
import { refreshRankings } from "./commands/refreshRankings";
import type { createCommand } from "./createCommand";
import { refreshRoles } from "./commands/refreshRoles";

const commands: Record<string, ReturnType<typeof createCommand>> = {
  "create-snapshot": createSnapshot,
  "refresh-rankings": refreshRankings,
  "refresh-roles": refreshRoles,
};

// const app = new Hono();
// serve({ fetch: app.fetch, port: 8787 });

export const discordClient = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});
discordClient.login(env.DISCORD_TOKEN);
export const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

export const privyClient = new PrivyClient(
  env.NEXT_PUBLIC_PRIVY_APP_ID,
  env.PRIVY_APP_SECRET
);

discordClient.once("ready", async () => {
  await rest.put(
    Routes.applicationGuildCommands(
      env.DISCORD_CLIENT_ID,
      env.DISCORD_GUILD_ID
    ),
    {
      body: Object.entries(commands).map(([name, command]) => {
        let base = new SlashCommandBuilder()
          .setName(name)
          .setDescription(command.description);

        if (command.params) {
          for (const param of command.params) {
            if (param.type === "string") {
              base.addStringOption((option) => {
                let parameter = option
                  .setName(param.name)
                  .setDescription(param.description)
                  .setRequired(param.required);

                if (param.choices) {
                  parameter.addChoices(
                    ...param.choices.map((choice) => ({
                      name: choice.name,
                      value: choice.value,
                    }))
                  );
                }

                return parameter;
              });
            }
            if (param.type === "number") {
              base.addNumberOption((option) =>
                option
                  .setName(param.name)
                  .setDescription(param.description)
                  .setRequired(param.required)
              );
            }
            if (param.type === "boolean") {
              base.addBooleanOption((option) =>
                option
                  .setName(param.name)
                  .setDescription(param.description)
                  .setRequired(param.required)
              );
            }
          }
        }

        return base;
      }),
    }
  );
  console.log("Discord bot is ready! 🤖");
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  await interaction.deferReply();

  try {
    const isAdmin = !!(interaction.member?.roles as any).cache.get(
      env.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? "1253532214784819240" // Tester Role
        : "1186404392346325173" // Staff Role
    );

    if (commands[interaction.commandName]) {
      const command = commands[interaction.commandName];

      if (command.onlyAdmin && !isAdmin) {
        return interaction.editReply(
          "You are not authorized to use this command"
        );
      }

      const { message, success } = await command.execute(interaction);

      return interaction.editReply(message);
    }
  } catch (e) {
    return interaction.editReply("Command failed to execute");
  }
});

for (const [name, command] of Object.entries(commands)) {
  if (command.schedule) {
    // Schedule and run command
  }

  // app.post(`/${name}`, async (c) => {
  //   const {message, success} = command.execute({
  //     sender: c.query("sender"),
  //   })
  // })
}
