import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import type { Router } from "@/app/api/[trpc]/router";

export const query = createTRPCProxyClient<Router>({
  links: [httpBatchLink({ url: "/api" })],
});
