export function defaultProfileImage(salt: string) {
  return `https://api.cloudnouns.com/v1/pfp?text=${salt}&background=1`;
}
