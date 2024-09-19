ALTER TABLE "quests" ADD COLUMN "created" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "start";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "end";