import {
  parseCover,
  parseId,
  parseRelation,
  parseText,
  parseTitle,
  parseUrl,
} from "./utils/parseProperties";

export type Game = {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
  liquipedia: string;
  roster: string[];
  video: string;
};

export default async function getGames(notion: any) {
  const games: Game[] = [];

  const response = await notion.databases.query({
    database_id: "cebdad4dd532435db44edacfe03a50e1",
  });

  for (const { id, cover, properties } of response.results) {
    const { Name, Description, Color, Talent, Liquipedia, Video } = properties;

    games.push({
      id: parseId(id),
      name: parseTitle(Name),
      image: await parseCover(cover),
      description: parseText(Description),
      color: parseText(Color),
      roster: parseRelation(Talent),
      liquipedia: parseUrl(Liquipedia),
      video: parseUrl(Video),
    });
  }

  return games;
}
