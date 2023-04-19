export default async function getContributors(notion, people) {
  const contributors = [];

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
