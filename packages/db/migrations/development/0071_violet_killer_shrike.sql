ALTER TABLE "proposals" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "markdown_new";