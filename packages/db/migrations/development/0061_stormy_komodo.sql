ALTER TABLE "quests" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "pinned" boolean DEFAULT false NOT NULL;