import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = createEnv({
  server: {
    GOOGLE_CALENDAR_API_KEY: z.string().min(1),
    NEYNAR_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
    PRIVY_APP_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "production"]),
    NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
    NEXT_PUBLIC_PIMLICO_API_KEY: z.string().min(1),
    NEXT_PUBLIC_MULTIBASE_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_PIMLICO_API_KEY: process.env.NEXT_PUBLIC_PIMLICO_API_KEY,
    NEXT_PUBLIC_MULTIBASE_API_KEY: process.env.NEXT_PUBLIC_MULTIBASE_API_KEY,
  },
});
