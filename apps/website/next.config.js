const createJiti = require("jiti");
const jiti = createJiti(__filename);

jiti("../../env");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
