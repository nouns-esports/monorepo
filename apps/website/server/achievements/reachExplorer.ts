import type { AuthenticatedUser } from "../queries/users";

export default async function reachExplorer(user: AuthenticatedUser) {
  if (user.nexus?.rank) {
    return true;
  }

  return false;
}
