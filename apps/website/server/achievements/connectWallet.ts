import type { AuthenticatedUser } from "../queries/users";

export default async function connectWallet(user: AuthenticatedUser) {
	if (user.wallets.length > 0) return true;

	return false;
}
