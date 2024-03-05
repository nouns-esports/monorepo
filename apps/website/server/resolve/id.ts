import { redisClient } from "../clients/redis";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const id = publicProcedure
  //   .input(
  //     z.object({
  //       address: z.string(),
  //     })
  //   )
  .query(async ({ input }) => {
    return redisClient.get("0xF03b4f449B38b2895fD84Dc293d97C92E49f9AC9");
  });
