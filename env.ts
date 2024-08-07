import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: `${path.relative(process.cwd(), __dirname)}/.env.${
    process.env.NODE_ENV
  }`,
});

export const env = createEnv({
  server: {
    GOOGLE_API_KEY: z.string().min(1),
    NEYNAR_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
    PRIVY_APP_SECRET: z.string().min(1),
    PRIVY_VERIFICATION_KEY: z.string().min(1),
    DISCORD_TOKEN: z.string().min(1),
    DISCORD_GUILD_ID: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
    PINATA_JWT: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    PUBLIC_DOMAIN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "production"]),
    NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  },
});
