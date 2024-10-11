import { and, asc, desc, eq, gt } from "drizzle-orm";
import { db, nexus, rankings } from "~/packages/db/schema";
import fs from "fs";
import { level } from "../website/utils/level";

const users = await db.query.nexus.findMany({
  where: gt(nexus.xp, 0),
});

let count = 0;
for (const user of users) {
  const { currentLevel } = level(user.xp);

  if (currentLevel >= 3) {
    console.log(user.discord, currentLevel);
    count++;
  }
}

console.log(count);
