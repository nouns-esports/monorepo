import { Client } from "@notionhq/client";
import getSchedule from "./google/getSchedule";
import getProjects from "./notion/getProjects";
import getGames from "./notion/getGames.js";
import getTalent from "./notion/getRosters";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION,
});

const [schedule, projects, games, talent] = await Promise.all([
  getSchedule(),
  getProjects(notion),
  getGames(notion),
  getTalent(notion),
]);

fs.writeFileSync(
  path.join(process.cwd(), "cache", `output.json`),
  JSON.stringify({
    schedule,
    projects,
    games,
    talent,
  })
);
