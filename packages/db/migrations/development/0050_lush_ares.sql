ALTER TABLE "art" ALTER COLUMN "tags" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "art" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "art" DROP COLUMN IF EXISTS "hash";