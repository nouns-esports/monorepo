import type { AuthenticatedUser } from "../queries/users";

export default async function reachExplorer(user: AuthenticatedUser) {
  if (user.nexus?.rank && [1, 2, 3].includes(user.nexus.rank.id)) {
    return true;
  }

  return false;
}
