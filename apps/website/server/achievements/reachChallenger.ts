import type { AuthenticatedUser } from "../queries/users";

export default async function reachChallenger(user: AuthenticatedUser) {
  if (user.nexus?.rank && [4, 5, 6].includes(user.nexus.rank.id)) {
    return true;
  }

  return false;
}
