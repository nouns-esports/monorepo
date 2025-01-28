import { createPublicClient, http } from "viem";
import { base, baseSepolia, mainnet } from "viem/chains";
import { env } from "~/env";

export const viemPublicClients = {
	base: createPublicClient({
		chain: base,
		transport: http(env.INFURA_API_KEY),
	}),
	baseSepolia: createPublicClient({
		chain: baseSepolia,
		transport: http(env.INFURA_API_KEY),
	}),
	mainnet: createPublicClient({
		chain: mainnet,
		transport: http(env.INFURA_API_KEY),
	}),
} as const;
