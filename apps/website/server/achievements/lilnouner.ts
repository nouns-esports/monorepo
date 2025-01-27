import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";

export default async function lilnouner(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const balance = (await viemPublicClients.mainnet.readContract({
			address: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b",
			abi: [],
			functionName: "balanceOf",
			args: [wallet.address],
		})) as bigint;

		if (balance > 1n) {
			return true;
		}
	}

	return false;
}
