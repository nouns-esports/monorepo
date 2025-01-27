import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";
import { parseAbi } from "viem";

export default async function becomeDelegate(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const currentVotes = await viemPublicClients.mainnet.readContract({
			address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
			abi: parseAbi([
				"function getCurrentVotes(address) external view returns (uint96)",
			]),
			functionName: "getCurrentVotes",
			args: [wallet.address as `0x${string}`],
		});

		if (currentVotes > 1n) {
			return true;
		}
	}

	return false;
}
