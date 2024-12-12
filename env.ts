import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		GOOGLE_API_KEY: z.string().min(1),
		NEYNAR_API_KEY: z.string().min(1),
		DATABASE_URL: z.string().url(),
		PRIVY_APP_SECRET: z.string().min(1),
		PRIVY_VERIFICATION_KEY: z.string().min(1),
		PRIVY_WEBHOOK_SIGNING_KEY: z.string().min(1),
		DISCORD_TOKEN: z.string().min(1),
		DISCORD_GUILD_ID: z.string().min(1),
		DISCORD_CLIENT_ID: z.string().min(1),
		PINATA_JWT: z.string().min(1),
		MATCHA_API_KEY: z.string().min(1),
		SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "production"]),
		NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
		NEXT_PUBLIC_DOMAIN: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
		NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
		NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
	},
});
