ALTER TABLE "moments" RENAME TO "creations";--> statement-breakpoint
ALTER TABLE "creations" DROP COLUMN IF EXISTS "event";