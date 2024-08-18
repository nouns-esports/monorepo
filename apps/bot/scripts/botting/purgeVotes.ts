import { eq } from "drizzle-orm";
import fs from "fs";
import { db, nexus, votes } from "~/packages/db/schema";

const data = fs.readFileSync("botCheck.csv", "utf8");

const lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();

  if (line) {
    const [_, id, proposal] = line.split(",");

    console.log(`User ID: ${id}, Proposal Number: ${proposal}`);

    await db.transaction(async (db) => {
      await db.delete(nexus).where(eq(nexus.id, id));
      await db.delete(votes).where(eq(votes.user, id));
    });
  }
}
