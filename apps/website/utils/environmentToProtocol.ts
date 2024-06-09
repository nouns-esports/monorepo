import { env } from "~/env";

export function environmentToProtocol() {
  return env.RAILWAY_PUBLIC_DOMAIN.startsWith("http")
    ? env.RAILWAY_PUBLIC_DOMAIN
    : `https://${env.RAILWAY_PUBLIC_DOMAIN}`;
}
