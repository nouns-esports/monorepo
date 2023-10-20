ALTER TABLE "giveaway_emails" ADD COLUMN "twitter" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "giveaway_emails" ADD CONSTRAINT "giveaway_emails_twitter_unique" UNIQUE("twitter");