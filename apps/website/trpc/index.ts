import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { privyClient } from "@/trpc/clients/privy";
import { trpc } from "./query/server";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const authToken = opts.req.headers.authorization?.replace("Bearer ", "");

  if (authToken) {
    try {
      const userClaim = await privyClient.verifyAuthToken(authToken);

      return {
        userClaim,
      };
    } catch (_) {}
  }

  return {};
}

export const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const publicProcedure = t.procedure;

export const onlyUser = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userClaim) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx,
  });
});

export const onlyAdmin = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userClaim) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  if (![""].includes(ctx.userClaim.userId)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
  }

  return next({
    ctx,
  });
});

export const onlyPassMember = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userClaim) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  const user = await trpc.getUser({ id: ctx.userClaim.userId });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found from claim",
    });
  }

  if (!user.pass) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Not a pass member" });
  }

  return next({
    ctx,
  });
});
