import type { AuthenticatedUser } from "../queries/users";

export default async function reachChampion(user: AuthenticatedUser) {
  if (user.nexus?.rank && [7, 8, 9].includes(user.nexus.rank.id)) {
    return true;
  }

  return false;
}
