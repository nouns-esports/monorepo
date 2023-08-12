import fs from "fs";
import path from "path";
import type { Project } from "../../scripts/notion/getProjects";
import type { Talent } from "../../scripts/notion/getRosters";
import type { Game } from "../../scripts/notion/getGames";
import type { Creator } from "../../scripts/notion/getCreators";
import type { Event } from "../../scripts/google/getSchedule";
export default function fetchCache() {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "cache", "output.json"), "utf8")
  ) as {
    schedule: Event[];
    projects: Project[];
    games: Game[];
    rosters: Talent[];
    creators: Creator[];
    balance: number;
  };
}
