import { env } from "~/env";
import { Client, REST, Routes, SlashCommandBuilder } from "discord.js";
import { PrivyClient } from "@privy-io/server-auth";
import { refreshNexus } from "./scripts/refreshNexus";

export const privyClient = new PrivyClient(
  env.NEXT_PUBLIC_PRIVY_APP_ID,
  env.PRIVY_APP_SECRET
);

export const discordClient = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

discordClient.login(env.DISCORD_TOKEN);

export const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

discordClient.once("ready", async () => {
  await rest.put(
    Routes.applicationGuildCommands(
      env.DISCORD_CLIENT_ID,
      env.DISCORD_GUILD_ID
    ),
    {
      body: [
        new SlashCommandBuilder()
          .setName("refresh")
          .setDescription("Refreshes the Nexus"),
      ],
    }
  );
  console.log("Discord bot is ready! 🤖");
});

discordClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  if (interaction.commandName === "refresh") {
    await interaction.deferReply();

    const error = await refreshNexus();

    if (error) {
      await interaction.editReply(`Error: ${error.message}`);
    }

    await interaction.editReply("Refreshed the Nexus! 🚀");
  }
});
