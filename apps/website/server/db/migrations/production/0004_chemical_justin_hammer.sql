ALTER TABLE "users" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "wallet";