ALTER TABLE "quests" RENAME COLUMN "hidden" TO "active";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "season";