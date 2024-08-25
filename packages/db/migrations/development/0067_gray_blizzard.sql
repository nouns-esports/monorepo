ALTER TABLE "nexus" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "markdown" jsonb;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "image_new" jsonb;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "video" jsonb;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "type" text DEFAULT 'markdown' NOT NULL;