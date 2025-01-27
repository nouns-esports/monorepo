import type { AuthenticatedUser } from "../queries/users";
import { viemPublicClients } from "../clients/viem";
import { parseAbi } from "viem";

export default async function becomeDelegate(user: AuthenticatedUser) {
	for (const wallet of user.wallets) {
		const [
			nounsCurrentVotes,
			lilnounsCurrentVotes,
			nounsBalance,
			lilnounsBalance,
		] = await Promise.all([
			viemPublicClients.mainnet.readContract({
				address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
				abi: parseAbi([
					"function getCurrentVotes(address) external view returns (uint96)",
				]),
				functionName: "getCurrentVotes",
				args: [wallet.address as `0x${string}`],
			}),
			viemPublicClients.mainnet.readContract({
				address: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b",
				abi: parseAbi([
					"function getCurrentVotes(address) external view returns (uint96)",
				]),
				functionName: "getCurrentVotes",
				args: [wallet.address as `0x${string}`],
			}),
			viemPublicClients.mainnet.readContract({
				address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
				abi: parseAbi([
					"function balanceOf(address) external view returns (uint256)",
				]),
				functionName: "balanceOf",
				args: [wallet.address as `0x${string}`],
			}),
			viemPublicClients.mainnet.readContract({
				address: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b",
				abi: parseAbi([
					"function balanceOf(address) external view returns (uint256)",
				]),
				functionName: "balanceOf",
				args: [wallet.address as `0x${string}`],
			}),
		]);

		console.log(
			user.id,
			wallet.address,
			nounsBalance,
			lilnounsBalance,
			nounsCurrentVotes,
			lilnounsCurrentVotes,
		);

		if (
			nounsBalance > 0n ||
			lilnounsBalance > 0n ||
			nounsCurrentVotes > 1n ||
			lilnounsCurrentVotes > 1n
		) {
			return true;
		}
	}

	return false;
}
