import type { Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  dialect: "postgresql",
  schema: `./db/schema.ts`,
  out: `./db/migrations/${env.NEXT_PUBLIC_ENVIRONMENT}`,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
