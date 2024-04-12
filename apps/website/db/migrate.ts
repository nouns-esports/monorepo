import { db } from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { env } from "@/env";

async function main() {
  await migrate(db, {
    migrationsFolder: `./db/migrations/${env.NEXT_PUBLIC_ENVIRONMENT}`,
  });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(0);
});
