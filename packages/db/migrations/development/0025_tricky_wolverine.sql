ALTER TABLE "creations" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "community" DROP NOT NULL;