import downloadImage from "../utils/downloadImage.js";
import validateData from "../utils/validateData.js";

export default async function getGames(notion) {
  const games = [];

  const response = await notion.databases.query({
    database_id: "45968dfce2734a37b248d3611f206ed6",
  });

  const results = response.results;

  for (const result of results) {
    const game = validateData("game", {
      id: result.id,
      name: result.properties.Name.title[0]?.plain_text,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
      description: result.properties.Description.rich_text[0]?.plain_text,
      color: result.properties.Color.rich_text[0]?.plain_text,
      talent: result.properties.Talent?.relation.map((talent) => talent.id),
      link: result.properties.Link?.url,
      video: result.properties.Video?.url,
    });

    games.push(game);
  }

  return games;
}
