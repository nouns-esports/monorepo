import { Client } from "@notionhq/client";
import getSchedule from "./google/getSchedule.js";
import getMetadata from "./notion/getMetadata.js";
import getProjects from "./notion/getProjects.js";
import getGames from "./notion/getGames.js";
import getTalent from "./notion/getTalent.js";
import fs from "fs";
import path from "path";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import dotenv from "dotenv";
import fetch from "node-fetch";
import getBalance from "./ethereum/getBalance.js";
globalThis.fetch = fetch;

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION,
});

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const [schedule, metadata, projects, games, talent, balance] =
  await Promise.all([
    getSchedule(),
    getMetadata(notion),
    getProjects(notion),
    getGames(notion),
    getTalent(notion),
    // getBalance(client),
  ]);

const output = {
  schedule,
  metadata,
  projects,
  games,
  talent,
  // balance,
};

fs.writeFileSync(
  path.join(process.cwd(), "cache", `output.json`),
  JSON.stringify(output)
);
