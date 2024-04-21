import { router } from "@/trpc/router";
import { t } from "@/trpc";

const createCaller = t.createCallerFactory(router);

export const trpc = createCaller({});
