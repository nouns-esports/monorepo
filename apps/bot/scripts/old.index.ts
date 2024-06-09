// import { env } from "./env.js";
// import { Client, REST, Routes } from "discord.js";

// // Commands
// import ping from "./commands/ping.js";

// const client = new Client({
//   intents: ["Guilds", "GuildMessages", "MessageContent"],
// });

// client.login(env.DISCORD_TOKEN);

// client.once("ready", () => {
//   console.log("Discord bot is ready! 🤖");
// });

// client.on("guildCreate", async (guild) => {
//   const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

//   await rest.put(
//     Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, guild.id),
//     {
//       body: [ping.data],
//     }
//   );
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) {
//     return;
//   }

//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
// });
