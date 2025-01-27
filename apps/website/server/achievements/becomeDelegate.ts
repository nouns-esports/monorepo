import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";

export default async function becomeDelegate(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const currentVotes = (await viemPublicClients.mainnet.readContract({
			address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
			abi: [],
			functionName: "getCurrentVotes",
			args: [wallet.address],
		})) as bigint;

		if (currentVotes > 1n) {
			return true;
		}
	}

	return false;
}
