import downloadImage from "../utils/downloadImage.js";
import validateData from "../utils/validateData.js";

export default async function getTalent(notion) {
  const talents = [];

  const response = await notion.databases.query({
    database_id: "1383635e688e4515ab467394501e13e5",
  });

  const results = response.results;

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
