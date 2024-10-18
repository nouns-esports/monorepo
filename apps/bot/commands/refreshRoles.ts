import { env } from "~/env";
import { createCommand } from "../createCommand";
import { discordClient, rest } from "..";
import { db, nexus } from "~/packages/db/schema";
import { Routes } from "discord.js";
import { isNotNull } from "drizzle-orm";

export const refreshRoles = createCommand({
  description: "Refreshes the ranked roles",
  schedule: "30 3 * * *",
  onlyAdmin: true,
  execute: async () => {
    const guild = discordClient.guilds.cache.get(env.DISCORD_GUILD_ID);

    if (!guild) {
      throw new Error("Guild not found");
    }

    const [nexusUsers, guildMembers] = await Promise.all([
      db.query.nexus.findMany({
        where: isNotNull(nexus.rank),
      }),
      guild.members.fetch(),
    ]);

    const users = nexusUsers.map((user) => {
      const guildMember = guildMembers.find(
        (member) => member.user.username === user.discord
      );

      if (!guildMember) return;
      if (!user.rank) return;

      return {
        id: user.id,
        rank: user.rank,
        discord: {
          id: guildMember.user.id,
          roles: guildMember.roles.cache.map((role) => role.id) ?? [],
        },
      };
    });

    let i = 1;

    for (const user of users) {
      console.log("Setting Roles", `${i++}/${users.length}`);

      if (!user) continue;

      const allRoles = roles(env.NEXT_PUBLIC_ENVIRONMENT);
      const role = allRoles.ranks[user.rank];

      if (!user.discord.roles.includes(role)) {
        await addRole({ user: user.discord.id, role });
      }

      if (!user.discord.roles.includes(allRoles.nexus)) {
        await addRole({ user: user.discord.id, role: allRoles.nexus });
      }

      for (const [rank, role] of Object.entries(allRoles.ranks)) {
        if (user.rank === Number(rank)) continue;

        if (user.discord.roles.includes(role)) {
          await removeRole({ user: user.discord.id, role });
        }
      }
    }

    return "Successfully refreshed roles";
  },
});

function roles(environment: "development" | "production"): {
  ranks: {
    [key: number]: string;
  };
  staff: string;
  nexus: string;
} {
  if (environment === "development") {
    return {
      ranks: {
        1: "1253532214784819240", // Explorer I
        2: "1253778440100909118", // Explorer II
        3: "1253778462511202365", // Explorer III
        4: "1292849974232485973", // Challenger I
        5: "1292849978930233355", // Challenger II
        6: "1292849981371318313", // Challenger III
        7: "1292849984428969995", // Champion I
        8: "1292849987188822036", // Champion II
        9: "1292849990086955058", // Champion III
      },
      staff: "1292850310515003493",
      nexus: "",
    };
  }

  return {
    ranks: {
      1: "1292850459672838144", // Explorer I
      2: "1292850515465601056", // Explorer II
      3: "1292850519181889590", // Explorer III
      4: "1292850522855833682", // Challenger I
      5: "1292850525380804629", // Challenger II
      6: "1292850528266616903", // Challenger III
      7: "1292850531479588967", // Champion I
      8: "1292850534327521300", // Champion II
      9: "1292850537292759051", // Champion III
    },
    staff: "1186404392346325173",
    nexus: "1296891293385101343",
  };
}

async function addRole(input: { user: string; role: string }) {
  return rest.put(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, input.role)
  );
}

async function removeRole(input: { user: string; role: string }) {
  return rest.delete(
    Routes.guildMemberRole(env.DISCORD_GUILD_ID, input.user, input.role)
  );
}
