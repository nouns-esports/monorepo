DO $$ BEGIN
 CREATE TYPE "public"."shape" AS ENUM('square', 'wide', 'tall');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "art" ADD COLUMN "shape" "shape" DEFAULT 'square';--> statement-breakpoint
ALTER TABLE "art" DROP COLUMN IF EXISTS "wide";