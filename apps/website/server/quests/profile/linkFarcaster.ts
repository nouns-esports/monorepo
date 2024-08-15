import type { User } from "@privy-io/server-auth";

export default async function linkFarcaster(user: User) {
  if (user.farcaster) return true;

  return false;
}
