import type { Client } from "@notionhq/client";
import downloadImage from "./downloadImage";
import type { Contributor } from "./getContributors";
import getContributors from "./getContributors";

export type Project = {
  name: string;
  image: string;
  description: string;
  leaders: Contributor[];
  url: string;
};

export type ProjectResult = {
  url: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Image: { files: Array<{ file: { url: string } }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Leaders: { people: Array<{ id: string }> };
  };
};

export default async function getProjects(notion: Client) {
  const projects: Project[] = [];

  const response = await notion.databases.query({
    database_id: "a0f4f990efa14ff5a93b1bf5f0cc21c3",
  });

  const results = response.results as unknown as ProjectResult[];

  for (const result of results) {
    const project = {
      name: result.properties.Name.title[0]?.plain_text,
      url: result.url,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
      description: result.properties.Description.rich_text[0]?.plain_text,
      leaders: await getContributors(
        notion,
        result.properties.Leaders.people.map((person) => person.id)
      ),
    };

    projects.push(project);
  }

  return projects;
}
