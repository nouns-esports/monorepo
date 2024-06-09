ALTER TABLE "proposals" RENAME COLUMN "description" TO "content";--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "voteCount" smallint DEFAULT 0;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "image" text;