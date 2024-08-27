CREATE TABLE IF NOT EXISTS "snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp NOT NULL,
	"type" text NOT NULL,
	"tag" text NOT NULL,
	"user" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "xp" RENAME COLUMN "xp_earned" TO "amount";--> statement-breakpoint
ALTER TABLE "xp" RENAME COLUMN "from" TO "quest";--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "incentive" text;