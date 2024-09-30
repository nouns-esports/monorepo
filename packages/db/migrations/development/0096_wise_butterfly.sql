CREATE TABLE IF NOT EXISTS "snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"type" text,
	"tag" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nexus" ALTER COLUMN "interests" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "action_inputs" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "wallet";--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "twitter";--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "discord";--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "farcaster";--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "linked_accounts";