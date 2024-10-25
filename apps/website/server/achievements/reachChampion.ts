import type { AuthenticatedUser } from "../queries/users";

export default async function reachChampion(user: AuthenticatedUser) {
  if (user.nexus?.rank && user.nexus.rank.id > 6) {
    return true;
  }

  return false;
}
