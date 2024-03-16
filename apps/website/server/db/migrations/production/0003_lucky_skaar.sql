ALTER TABLE "applicationResponses" RENAME COLUMN "id" TO "user";--> statement-breakpoint
ALTER TABLE "applicationResponses" ADD PRIMARY KEY ("user");