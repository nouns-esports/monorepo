import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { Router } from "@/app/api/router";
import { getAccessToken } from "@privy-io/react-auth";
import { createTRPCReact } from "@trpc/react-query";

// export const query = createTRPCNext<Router>({
//   config() {
//     return {
//       links: [
//         httpBatchLink({
//           url: "/api",
//           async headers() {
//             return {
//               Authorization: `Bearer ${(await getAccessToken()) || ""}`,
//             };
//           },
//         }),
//       ],
//     };
//   },
// });

export const query = createTRPCReact<Router>({});
