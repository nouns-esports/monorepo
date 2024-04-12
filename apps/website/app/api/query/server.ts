import { httpBatchLink } from "@trpc/client";
import { router } from "@/app/api/router";

export const query = router.createCaller({
  links: [httpBatchLink({ url: "/api" })],
});
