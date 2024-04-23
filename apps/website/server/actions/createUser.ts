import { db, users } from "@/db/schema";
import { onlyUserAction } from "@/server/actions";
import { z } from "zod";

export const createUser = onlyUserAction(
  z.object({
    id: z.string().min(1),
    pass: z.boolean().optional(),
  }),
  async (input, ctx) => {
    // if (ctx.userClaim.userId !== input.id) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "You are not authorized to create this user",
    //   });
    // }

    return db.insert(users).values(input);
  }
);
