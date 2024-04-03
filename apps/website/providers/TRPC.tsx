"use client";

import { env } from "@/env";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAccessToken } from "@privy-io/react-auth";
import { createTRPCReact } from "@trpc/react-query";
import { Router } from "@/app/api/[trpc]/router";

export const trpc = createTRPCReact<Router>({});

export default function TRPC(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
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
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
