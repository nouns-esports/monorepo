ALTER TABLE "events" ALTER COLUMN "season" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "creations" ADD COLUMN "event" text;