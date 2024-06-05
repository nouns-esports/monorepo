ALTER TABLE "applicationResponses" RENAME COLUMN "currentGame" TO "whatGameDoYouPlayTheMost";--> statement-breakpoint
ALTER TABLE "applicationResponses" RENAME COLUMN "whoAreYou" TO "whoAreYouAndWhatIsYourEsportsBackground";--> statement-breakpoint
ALTER TABLE "applicationResponses" RENAME COLUMN "favoriteGame" TO "whatDoYouThinkIsNeededToPushTheEsportsIndustryForward";--> statement-breakpoint
ALTER TABLE "applicationResponses" ADD COLUMN "whatThingsWouldYouLikeToSeeFundedByNouns" text NOT NULL;