import {
  parseCover,
  parseSelect,
  parseSingleRelation,
  parseTitle,
  parseUrl,
} from "./utils/parseProperties.js";

export type Socials = {
  twitch: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  instagram: string;
};

export type Talent = {
  id: string;
  name: string;
  game: string;
  image: string;
  role: string;
  liquipedia: string;
  socials: Socials;
};

export default async function getRosters(notion: any) {
  const rosters: Talent[] = [];

  const response = await notion.databases.query({
    database_id: "647f146393df41018183ee9a3bebd37f",
  });

  for (const { id, cover, properties } of response.results) {
    const {
      Name,
      Game,
      Role,
      Liquipedia,
      Twitch,
      Twitter,
      YouTube,
      TikTok,
      Instagram,
    } = properties;

    rosters.push({
      id,
      name: parseTitle(Name),
      game: parseSingleRelation(Game),
      image: await parseCover(cover),
      role: parseSelect(Role),
      liquipedia: parseUrl(Liquipedia),
      socials: {
        twitch: parseUrl(Twitch),
        twitter: parseUrl(Twitter),
        youtube: parseUrl(YouTube),
        tiktok: parseUrl(TikTok),
        instagram: parseUrl(Instagram),
      },
    });
  }

  return rosters;
}
