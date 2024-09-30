import { env } from "~/env";
import { Client, REST, Routes, SlashCommandBuilder } from "discord.js";
import { PrivyClient } from "@privy-io/server-auth";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

// Commands
import { backupDatabase } from "./commands/backupDatabase";
import { createSnapshot } from "./commands/createSnapshot";
import { refreshRankings } from "./commands/refreshRankings";
import type { createCommand } from "./createCommand";

const commands: Record<string, ReturnType<typeof createCommand>> = {
  "backup-database": backupDatabase,
  "create-snapshot": createSnapshot,
  "refresh-rankings": refreshRankings,
};

const app = new Hono();
serve({ fetch: app.fetch, port: 8787 });

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
      body: Object.entries(commands).map(([name, command]) =>
        new SlashCommandBuilder()
          .setName(name)
          .setDescription(command.description)
      ),
    }
  );
  console.log("Discord bot is ready! 🤖");
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  if (
    !Array.isArray(interaction.member?.roles) ||
    !interaction.member.roles.includes("role id")
  ) {
    return interaction.reply("You don't have permissions to run this command");
  }

  if (commands[interaction.commandName]) {
    await interaction.deferReply();

    const command = commands[interaction.commandName];

    const { message, success } = await command.execute(interaction);

    return interaction.editReply(message);
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
