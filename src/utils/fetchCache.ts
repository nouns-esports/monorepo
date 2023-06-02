import fs from "fs";
import path from "path";

type Contributor = {
  name: string;
  image: string;
};

type Project = {
  name: string;
  image: string;
  url: string;
};

type Talent = {
  id: string;
  name: string;
  game: string;
  image: string;
  role: string[];
};

type Game = {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
  liquipedia: string;
  talent: string[];
  video: string;
};

type Event = {
  id: string;
  status: string;
  htmlLink: string;
  location: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

export type Cache = {
  schedule: Event[];
  projects: Project[];
  games: Game[];
  talent: Talent[];
  balance: number;
};

export default function fetchCache() {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "cache", "output.json"), "utf8")
  ) as Cache;
}
