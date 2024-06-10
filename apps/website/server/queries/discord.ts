import { env } from "~/env";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserId(input: { user: string }) {
  noStore();

  const response = await fetch(
    `https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/search?query=${input.user}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
      },
    }
  );

  console.log("getUserId status", response.status);
  console.log("getUserId user", input.user);
  // console.log("getUserId response", await response.json());

  const members = await response.json();

  console.log("getUserId members", members);

  for (const member of members) {
    console.log("getUserId member", member);
    if (member.user.username === input.user.split("#")[0]) {
      console.log("getUserId member.user.id", member.user.id);
      return member.user.id as string;
    }
  }
}
