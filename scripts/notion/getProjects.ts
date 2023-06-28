import {
  parseCover,
  parseRelation,
  parseTitle,
  parseUrl,
} from "./utils/parseProperties.js";

export type Project = {
  id: string;
  name: string;
  image: string;
  url: string;
  leaders: string[];
};

export default async function getProjects(notion: any) {
  const projects: Project[] = [];

  const response = await notion.databases.query({
    database_id: "6d1b60f139724692b4400fd13d703fb1",
  });

  for (const { id, cover, properties } of response.results) {
    const { Name, Link, Leaders } = properties;

    projects.push({
      id,
      name: parseTitle(Name),
      url: parseUrl(Link),
      image: await parseCover(cover),
      leaders: parseRelation(Leaders),
    });
  }

  return projects;
}
