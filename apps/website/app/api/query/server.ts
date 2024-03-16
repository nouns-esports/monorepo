import { httpBatchLink } from "@trpc/client";
import { router } from "@/app/api/[trpc]/route";

export const query = router.createCaller({
  links: [httpBatchLink({ url: "/api" })],
});
