import type { User } from "@privy-io/server-auth";

export function userToProfile(user: User) {
  const socials = {
    twitter: user.twitter
      ? `https://x.com/${user.twitter.username}`
      : undefined,
    farcaster: user.farcaster
      ? `https://warpcast.com/${user.farcaster.username}`
      : undefined,
  };

  if (user.farcaster?.displayName && user.farcaster?.pfp) {
    return {
      id: user.id,
      name: user.farcaster.displayName,
      pfp: user.farcaster.pfp,
      socials,
    };
  }

  if (user.twitter?.username && user.twitter?.profilePictureUrl) {
    return {
      id: user.id,
      name: user.twitter.username,
      pfp: user.twitter.profilePictureUrl,
      socials,
    };
  }

  if (user.discord?.username) {
    return {
      id: user.id,
      name: user.discord.username,
      pfp: `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
      socials,
    };
  }
}
