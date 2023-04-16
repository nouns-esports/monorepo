import type { Client } from "@notionhq/client";
import downloadImage from "./downloadImage";
import validateData from "./validateData";

export type Person = {
  id: string;
  name: string;
  team: Team;
  image: string;
  role: string[];
};

export type Team = {
  id: string;
  url: string;
  name: string;
  image: string;
  description: string;
  color: string;
  liquipedia: string;
  members: string[];
};

export type TeamResult = {
  id: string;
  url: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Image: { files: Array<{ file: { url: string } }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Color: { rich_text: Array<{ plain_text: string }> };
    Liquipedia: { url: string };
    Members: { relation: Array<{ id: string }> };
  };
};

export default async function getTeams(notion: Client) {
  const teams: Team[] = [];

  const response = await notion.databases.query({
    database_id: "45968dfce2734a37b248d3611f206ed6",
  });

  const results = response.results as unknown as TeamResult[];

  for (const result of results) {
    const team = validateData("team", {
      id: result.id,
      name: result.properties.Name.title[0]?.plain_text,
      url: result.url,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
      description: result.properties.Description.rich_text[0]?.plain_text,
      color: result.properties.Color.rich_text[0]?.plain_text,
      members: result.properties.Members?.relation.map((member) => member.id),
      liquipedia: result.properties.Liquipedia?.url,
    });

    teams.push(team);
  }

  return teams;
}
