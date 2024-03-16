import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import type { Router } from "@/app/api/[trpc]/route";

export const query = createTRPCProxyClient<Router>({
  links: [httpBatchLink({ url: "/api" })],
});
