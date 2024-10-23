import type { AuthenticatedUser } from "../queries/users";

export default async function connectFarcaster(user: AuthenticatedUser) {
  if (user.farcaster) return true;

  return false;
}
