import type { AuthenticatedUser } from "../queries/users";

export default async function connectX(user: AuthenticatedUser) {
  if (user.twitter) return true;

  return false;
}
