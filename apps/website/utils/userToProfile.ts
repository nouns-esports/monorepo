import { User } from "@privy-io/server-auth";

export function userToProfile(user?: User) {
  if (user?.farcaster) {
    return {
      id: user.id,
      name: user.farcaster.displayName ?? "",
      pfp:
        user.farcaster.pfp ??
        `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    };
  }

  if (user?.discord) {
    return {
      id: user.id,
      name: user.discord.username ?? "",
      pfp: `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    };
  }

  if (user?.twitter) {
    return {
      id: user.id,
      name: user.twitter.name ?? "",
      pfp:
        user.twitter.profilePictureUrl ??
        `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    };
  }
}
