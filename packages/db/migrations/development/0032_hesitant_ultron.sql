CREATE TABLE IF NOT EXISTS "attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" text NOT NULL,
	"user" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bets" (
	"id" text PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"outcome" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outcomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"prediction" text NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"outcome" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "predictions" (
	"id" text PRIMARY KEY NOT NULL,
	"event" text,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"rules" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nexus" ALTER COLUMN "fid" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "season";--> statement-breakpoint
ALTER TABLE "nexus" ADD CONSTRAINT "nexus_username_unique" UNIQUE("username");