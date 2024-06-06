import type { User } from "@privy-io/server-auth";

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
      name: user.discord.username?.split("#")[0] ?? "",
      pfp: `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    };
  }
}
