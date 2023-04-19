import { Client } from "@notionhq/client";
import getSchedule from "./google/getSchedule.js";
import getMetadata from "./notion/getMetadata.js";
import getProjects from "./notion/getProjects.js";
import getTeams from "./notion/getTeams.js";
import getTalent from "./notion/getTalent.js";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION,
});

const [schedule, metadata, projects, teams, talent] = await Promise.all([
  getSchedule(),
  getMetadata(notion),
  getProjects(notion),
  getTeams(notion),
  getTalent(notion),
]);

const output = {
  schedule,
  metadata,
  projects,
  teams,
  talent,
};

fs.writeFileSync(
  path.join(process.cwd(), "cache", `output.json`),
  JSON.stringify(output)
);
