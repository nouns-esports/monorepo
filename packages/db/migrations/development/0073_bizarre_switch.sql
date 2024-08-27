CREATE TABLE IF NOT EXISTS "incentives" (
	"id" serial PRIMARY KEY NOT NULL,
	"xp" integer NOT NULL,
	"cooldown" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nexus" ALTER COLUMN "image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "max_completions";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "cooldown";