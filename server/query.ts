import { httpBatchLink } from "@trpc/client";
import { router } from "@/server/router";

export const query = router.createCaller({
  links: [httpBatchLink({ url: "/api" })],
});
