import { httpBatchLink } from "@trpc/client";
import { router } from "@/app/api/[trpc]/router";

export const query = router.createCaller({
  links: [httpBatchLink({ url: "/api" })],
});
