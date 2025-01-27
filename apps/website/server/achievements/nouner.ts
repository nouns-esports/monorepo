import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";
import { parseAbi } from "viem";

export default async function nouner(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const balance = await viemPublicClients.mainnet.readContract({
			address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
			abi: parseAbi([
				"function balanceOf(address) external view returns (uint256)",
			]),
			functionName: "balanceOf",
			args: [wallet.address as `0x${string}`],
		});

		if (balance > 1n) {
			return true;
		}
	}

	return false;
}
