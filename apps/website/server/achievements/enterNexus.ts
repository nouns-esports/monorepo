import type { AuthenticatedUser } from "../queries/users";

export default async function enterNexus(user: AuthenticatedUser) {
  if (user.nexus?.rank) return true;

  return false;
}
