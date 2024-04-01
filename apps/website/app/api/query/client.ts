import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { Router } from "@/app/api/[trpc]/router";
import { getAccessToken } from "@privy-io/react-auth";

export const query = createTRPCNext<Router>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api",
          async headers() {
            return {
              Authorization: `Bearer ${(await getAccessToken()) || ""}`,
            };
          },
        }),
      ],
    };
  },
});
