import type { Client } from "@notionhq/client";
import downloadImage from "./downloadImage";
import validateData from "./validateData";

export type Talent = {
  id: string;
  name: string;
  team: string;
  image: string;
  role: string[];
};

export type TalentResult = {
  id: string;
  url: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Team: { relation: Array<{ id: string }> };
    Image: { files: Array<{ file: { url: string } }> };
    Role: { multi_select: Array<{ name: string }> };
  };
};

export default async function getTalent(notion: Client) {
  const talents: Talent[] = [];

  const response = await notion.databases.query({
    database_id: "1383635e688e4515ab467394501e13e5",
  });

  const results = response.results as unknown as TalentResult[];

  for (const result of results) {
    const talent = validateData("talent", {
      id: result.id,
      name: result.properties.Name.title[0]?.plain_text,
      team: result.properties.Team.relation[0]?.id,
      image: await downloadImage(result.properties.Image.files[0]?.file?.url),
      role: result.properties.Role.multi_select.map((role) => role.name),
    });

    talents.push(talent);
  }

  return talents;
}
