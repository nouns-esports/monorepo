import type { AuthenticatedUser } from "../queries/users";

export default async function reachChallenger(user: AuthenticatedUser) {
  if (user.nexus?.rank && user.nexus.rank.id > 3) {
    return true;
  }

  return false;
}
