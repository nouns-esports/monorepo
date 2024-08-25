import { eq } from "drizzle-orm";
import fs from "fs";
import { db, proposals as proposalsTable } from "~/packages/db/schema";

const dump = fs.readFileSync("3455.dat", "utf8");

const rows = dump.split("\n").filter((row) => row.trim() !== "");

const proposals = await db.query.proposals.findMany();

await db.transaction(async (tx) => {
  for (const row of rows) {
    const fields = row.split("\t");

    if (!fields[5]) {
      continue;
    }

    const parsedData = {
      id: parseInt(fields[0]),
      user: fields[1],
      round: fields[2],
      title: fields[3],
      description: fields[4] || "",
      content: fields[5].replace(/\\\\/g, "\\"),
      value: parseFloat(fields[6]),
      createdAt: new Date(fields[7]),
      hidden: fields[8] === "t",
      published: fields[9] === "t",
      totalVotes: parseInt(fields[10]),
      image: fields[11] || "",
    };

    if (proposals.find((p) => p.id === parsedData.id)) {
      await tx
        .update(proposalsTable)
        .set({
          markdown: {
            content: parsedData.content,
            description: parsedData.description,
            preview: parsedData.image,
          },
        })
        .where(eq(proposalsTable.id, parsedData.id));
    }
  }
});
