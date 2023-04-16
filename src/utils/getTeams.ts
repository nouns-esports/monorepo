import type { Client } from "@notionhq/client";
import downloadImage from "./downloadImage";

export type Talent = {
  name: string;
  team: Team;
  image: string;
  role: string[];
};

export type Team = {
  url: string;
  name: string;
  image: string;
  description: string;
  color: string;
  liquipedia: string;
  members: Talent[];
};

export type TeamResult = {
  url: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Image: { files: Array<{ file: { url: string } }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Color: { rich_text: Array<{ plain_text: string }> };
    Liquipedia: { url: string };
    Members: { relation: any };
  };
};

export default async function getTeams(notion: Client) {
  const teams: Team[] = [];

  const response = await notion.databases.query({
    database_id: "45968dfce2734a37b248d3611f206ed6",
  });

  const results = response.results as unknown as TeamResult[];

  for (const result of results) {
    console.log(result.properties.Members);
    const team = {
      name: result.properties.Name.title[0]?.plain_text,
      url: result.url,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
      description: result.properties.Description.rich_text[0]?.plain_text,
      color: result.properties.Color.rich_text[0]?.plain_text,
    };

    teams.push(team);
  }

  return [];
}
