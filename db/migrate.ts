import { db } from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function main() {
  console.log("Migrating...");

  await migrate(db, { migrationsFolder: "./db/migrations" });

  console.log("Migration complete");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(0);
});
