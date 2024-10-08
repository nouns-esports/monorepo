import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
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
};
export const viemPublicClient =
  env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? viemPublicClients["baseSepolia"]
    : viemPublicClients["base"];
