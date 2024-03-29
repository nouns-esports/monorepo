import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "@/server/router";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api",
    req,
    router,
    createContext: () => ({}),
  });
}

export { handler as GET, handler as POST };
