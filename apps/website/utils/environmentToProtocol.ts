import { env } from "~/env";

export function environmentToProtocol() {
  return env.PUBLIC_DOMAIN.startsWith("http")
    ? env.PUBLIC_DOMAIN
    : `https://${env.PUBLIC_DOMAIN}`;
}
