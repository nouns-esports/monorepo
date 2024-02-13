"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useMemo } from "react";

if (
  typeof window !== "undefined" &&
  !window.location.host.includes("127.0.0.1") &&
  !window.location.host.includes("localhost")
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://app.posthog.com",
  });
}

export default function PostHog(props: { children: React.ReactNode }) {
  const url = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  }, []);

  useEffect(() => {
    if (url) {
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [url]);

  return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>;
}
