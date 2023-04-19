import downloadImage from "../utils/downloadImage.js";
import getContributors from "./getContributors.js";
import validateData from "../utils/validateData.js";

export default async function getProjects(notion) {
  const projects = [];

  const response = await notion.databases.query({
    database_id: "a0f4f990efa14ff5a93b1bf5f0cc21c3",
  });

  const results = response.results;

  for (const result of results) {
    const project = validateData("project", {
      name: result.properties.Name.title[0]?.plain_text,
      url: result.url,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
      description: result.properties.Description.rich_text[0]?.plain_text,
      leaders: await getContributors(
        notion,
        result.properties.Leaders.people.map((person) => person.id)
      ),
    });

    projects.push(project);
  }

  return projects;
}
