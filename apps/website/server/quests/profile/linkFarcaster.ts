import type { Nexus } from "~/packages/db/schema";

export default async function linkFarcaster(user: Nexus) {
  if (user.farcaster) return true;

  return false;
}
