// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// import { router } from "../../../trpc/router";
// import { createContext } from "@/trpc/context";

// function handler(req: Request, res: Response) {
//   return fetchRequestHandler({
//     endpoint: "/api",
//     req,
//     router,
//     createContext: (opts) => createContext({ req: opts.req }),

//     // responseMeta(opts) {
//     //   const { errors } = opts;

//     //   if (errors.length) {
//     //     // propagate http first error from API calls
//     //     return {
//     //       status: errors[0].data?.httpStatus ?? 500,
//     //     };
//     //   }

//     //   const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
//     //   return {
//     //     headers: {
//     //       "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
//     //     },
//     //   };
//     // },
//   });
// }

// export { handler as GET, handler as POST };
