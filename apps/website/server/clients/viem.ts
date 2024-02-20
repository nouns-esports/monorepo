import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? baseSepolia : base,
  transport: http(),
});
