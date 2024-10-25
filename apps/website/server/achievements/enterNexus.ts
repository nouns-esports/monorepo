import type { AuthenticatedUser } from "../queries/users";

export default async function enterNexus(user: AuthenticatedUser) {
  if (user.nexus) return true;

  return false;
}
