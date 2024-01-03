import { db } from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function main() {
  await migrate(db, { migrationsFolder: "./db/migrations" });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(0);
});
