import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DISCORD_TOKEN: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env,
});
