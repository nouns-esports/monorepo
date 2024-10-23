import type { AuthenticatedUser } from "../queries/users";

export default async function connectWallet(user: AuthenticatedUser) {
  if (user.wallet) return true;

  return false;
}
