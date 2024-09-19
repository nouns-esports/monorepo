ALTER TABLE "quests" ALTER COLUMN "difficulty" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "difficulty" SET NOT NULL;