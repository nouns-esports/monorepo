DROP TABLE "clicks";--> statement-breakpoint
ALTER TABLE "creations" RENAME TO "moments";--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "snapshot" text;--> statement-breakpoint
ALTER TABLE "xp" DROP COLUMN IF EXISTS "reason";