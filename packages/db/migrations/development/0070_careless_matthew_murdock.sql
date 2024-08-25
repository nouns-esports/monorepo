ALTER TABLE "proposals" ALTER COLUMN "image" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "proposals" ALTER COLUMN "video" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "markdown_new" text;