import type { NextConfig } from "next";
import { env } from "~/env";

export default {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "**",
			},
			{ protocol: "https", hostname: "i.ytimg.com", pathname: "**" },
			{ protocol: "https", hostname: "ipfs.nouns.gg", pathname: "**" },
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
} satisfies NextConfig;
