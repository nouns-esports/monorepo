import { db, applicationResponses } from "@/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { privyClient } from "./clients/privy";

export const setApplicationResponse = publicProcedure
  .input(
    z.object({
      token: z.string().min(1),
      user: z.string().min(1),
      whatGameDoYouPlayTheMost: z.string().min(1),
      whoAreYouAndWhatIsYourEsportsBackground: z.string().min(1),
      whatDoYouThinkIsNeededToPushTheEsportsIndustryForward: z.string().min(1),
      whatThingsWouldYouLikeToSeeFundedByNouns: z.string().min(1),
    })
  )
  .mutation(async ({ input }) => {
    const { token, ...values } = input;

    await privyClient.verifyAuthToken(token);
    return db.insert(applicationResponses).values(values);
  });
