CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"community" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "badges";--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "place" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "event" text;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "event" text;--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "pinned";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "prerequisite";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "min_rank";