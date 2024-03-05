import { PostHog } from "posthog-node";
import { env } from "@/env";

const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
  host: "https://app.posthog.com",
  flushAt: 1,
  flushInterval: 0,
});

if (env.NEXT_PUBLIC_ENVIRONMENT === "development") posthogClient.disable();
