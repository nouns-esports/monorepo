import fs from "fs";
import path from "path";

type Contributor = {
  name: string;
  image: string;
};

type Project = {
  name: string;
  image: string;
  description: string;
  leaders: Contributor[];
  url: string;
};

type Talent = {
  id: string;
  name: string;
  team: string;
  image: string;
  role: string[];
};

type Person = {
  id: string;
  name: string;
  team: Team;
  image: string;
  role: string[];
};

type Team = {
  id: string;
  url: string;
  name: string;
  image: string;
  description: string;
  color: string;
  liquipedia: string;
  members: string[];
};

type ScheduleEvent = {
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

type Schedule = {
  items: Array<ScheduleEvent>;
};

export type Cache = {
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
