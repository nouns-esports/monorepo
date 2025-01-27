import { createPublicClient, http } from "viem";
import { base, baseSepolia, mainnet } from "viem/chains";
import { env } from "~/env";

export const viemPublicClients = {
	base: createPublicClient({
		chain: base,
		transport: http(),
	}),
	baseSepolia: createPublicClient({
		chain: baseSepolia,
		transport: http(),
	}),
	mainnet: createPublicClient({
		chain: mainnet,
		transport: http(),
	}),
} as const;
