import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const publicProcedure = t.procedure;

// tRPC x GraphQL
// /api/trpc/[trpc] - graphql like resolvers
// /api - graphql like endpoint
// const { handler } = tRPCGraph(router)
// async function query(q: any): Promise<any> {}
// const GAME_QUERY = {
//   ...["id", "name"],
//   rosters: {
//     ...["liquipedia"],
//     talent: {
//       ...["name", "image"],
//       active: true,
//     },
//   },
// };
// const {
//   id,
//   gameName,
//   rosters: {
//     liquipedia,
//     talent: { playerName, image },
//   },
// } = await query(GAME_QUERY);
