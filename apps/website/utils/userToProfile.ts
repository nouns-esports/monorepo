import type { User } from "@privy-io/server-auth";

export function userToProfile(user: User) {
  return {
    id: user.id,
    name:
      user.farcaster?.displayName ??
      user.discord?.username?.split("#")[0] ??
      user.twitter?.username ??
      `${user.id.substring(10, 15)}`,
    pfp:
      user.farcaster?.pfp ??
      `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    socials: {
      twitter: user.twitter
        ? `https://x.com/${user.twitter.username}`
        : undefined,
      farcaster: user.farcaster
        ? `https://warpcast.com/${user.farcaster.username}`
        : undefined,
    },
  };
}
