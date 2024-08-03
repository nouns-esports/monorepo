import { db } from "~/packages/db/schema";
import fs from "fs";

const communities = await db.query.communities.findMany();
const creations = await db.query.creations.findMany();

fs.writeFileSync("communities.json", JSON.stringify(communities));
fs.writeFileSync("creations.json", JSON.stringify(creations));
