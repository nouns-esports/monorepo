ALTER TABLE "quests" ADD COLUMN "season" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "start" timestamp;--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "end" timestamp;