import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const publicProcedure = t.procedure;

export const onlyAdmin = t.procedure;

export const onlyUser = t.procedure;

export const onlyPassMember = t.procedure;
