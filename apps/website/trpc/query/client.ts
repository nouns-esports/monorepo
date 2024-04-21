import { createTRPCReact } from "@trpc/react-query";
import { Router } from "@/trpc/router";

export const trpc = createTRPCReact<Router>({});
