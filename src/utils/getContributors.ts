import type { Client } from "@notionhq/client";

export type Contributor = {
  name: string;
  image: string;
};

export default async function getContributors(
  notion: Client,
  people: string[]
) {
  const contributors: Contributor[] = [];

  for (const person of people) {
    const userResponse = await notion.users.retrieve({
      user_id: person,
    });

    if (userResponse.name && userResponse.avatar_url) {
      contributors.push({
        name: userResponse.name,
        image: userResponse.avatar_url,
      });
    }
  }

  return contributors;
}
