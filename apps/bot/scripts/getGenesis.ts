import fs from "fs";
import { db } from "~/packages/db/schema";

const users = await db.query.nexus.findMany({
  with: {
    votes: {
      columns: {
        round: true,
      },
    },
  },
});

fs.writeFileSync("genesis.json", JSON.stringify(users));
