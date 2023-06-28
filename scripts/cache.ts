import { Client } from "@notionhq/client";
import getSchedule from "./google/getSchedule.js";
import getProjects from "./notion/getProjects.js";
import getGames from "./notion/getGames.js";
import getRosters from "./notion/getRosters.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION,
});

const [schedule, projects, games, rosters] = await Promise.all([
  getSchedule(),
  getProjects(notion),
  getGames(notion),
  getRosters(notion),
]);

fs.writeFileSync(
  path.join(process.cwd(), "cache", `output.json`),
  JSON.stringify({
    schedule,
    projects,
    games,
    rosters,
  })
);
