import type { AuthenticatedUser } from "../queries/users";

export default async function connectDiscord(user: AuthenticatedUser) {
  if (user.discord) return true;

  return false;
}
