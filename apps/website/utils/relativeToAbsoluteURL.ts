import { env } from "~/env";

export function relativeToAbsoluteURL(path: string) {
  return env.PUBLIC_DOMAIN.startsWith("localhost")
    ? `http://${env.PUBLIC_DOMAIN}${path}`
    : `https://${env.PUBLIC_DOMAIN}${path}`;
}
