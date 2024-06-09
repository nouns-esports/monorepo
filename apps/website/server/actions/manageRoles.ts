"use server";

import { env } from "~/env";

const roles = {
  Explorer: 1245110318603042950,
  Challenger: 1245122417903534228,
  Elite: 1245122576645361817,
} as const;

export async function addRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Elite";
}) {
  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${input.user}/roles/${roles[input.role]}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        method: "PUT",
      },
    }
  );

  console.log("add role", response.status, response.ok, await response.json());
}

export async function removeRole(input: {
  user: string;
  role: "Explorer" | "Challenger" | "Elite";
}) {
  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${input.user}/roles/${roles[input.role]}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        method: "DELETE",
      },
    }
  );

  console.log(
    "remove role",
    response.status,
    response.ok,
    await response.json()
  );
}
