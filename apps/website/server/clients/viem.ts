import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { env } from "@/env";

export const publicClient = createPublicClient({
  chain: env.NEXT_PUBLIC_ENVIRONMENT === "development" ? baseSepolia : base,
  transport: http(),
});
