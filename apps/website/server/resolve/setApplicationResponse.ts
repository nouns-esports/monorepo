import { db, applicationResponses } from "@/server/db/schema";
import { publicProcedure } from "../clients/trpc";
import { z } from "zod";
import { privyClient } from "../clients/privy";

export const setApplicationResponse = publicProcedure
  .input(
    z.object({
      token: z.string(),
      user: z.string(),
      whatGameDoYouPlayTheMost: z.string(),
      whoAreYouAndWhatIsYourEsportsBackground: z.string(),
      whatDoYouThinkIsNeededToPushTheEsportsIndustryForward: z.string(),
      whatThingsWouldYouLikeToSeeFundedByNouns: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const { token, ...values } = input;

    await privyClient.verifyAuthToken(token);
    return db.insert(applicationResponses).values(values);
  });
