import downloadImage from "../utils/downloadImage.js";
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
      url: result.properties.URL?.url,
      image: await downloadImage(result.properties.Image.files[0].file?.url),
    });

    projects.push(project);
  }

  return projects;
}
