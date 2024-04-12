ALTER TABLE "rounds" ADD COLUMN "tags" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "category";