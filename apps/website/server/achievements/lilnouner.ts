import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";
import { parseAbi } from "viem";

export default async function lilnouner(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const balance = await viemPublicClients.mainnet.readContract({
			address: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b",
			abi: parseAbi([
				"function balanceOf(address) external view returns (uint256)",
			]),
			functionName: "balanceOf",
			args: [wallet.address as `0x${string}`],
		});

		console.log(user.id, wallet.address, balance);

		if (balance > 0n) {
			return true;
		}
	}

	return false;
}
