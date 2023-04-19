import fs from "fs";
import path from "path";

export type Contributor = {
  name: string;
  image: string;
};

export type Project = {
  name: string;
  image: string;
  description: string;
  leaders: Contributor[];
  url: string;
};

export type Talent = {
  id: string;
  name: string;
  team: string;
  image: string;
  role: string[];
};

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

export type ScheduleEvent = {
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

export type Schedule = {
  items: Array<ScheduleEvent>;
};

type Cache = {
  schedule: Schedule;
  projects: Project[];
  teams: Team[];
  talent: Talent[];
  metadata: { banner: { message: string; url: string }; tagline: string };
};

export default function fetchCache() {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "cache", "output.json"), "utf8")
  ) as Cache;
}
