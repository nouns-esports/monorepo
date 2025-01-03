CREATE TABLE IF NOT EXISTS "attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" text NOT NULL,
	"type" text NOT NULL,
	"user" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"outcome" integer NOT NULL,
	"prediction" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"type" text NOT NULL,
	"round" text,
	"quest" text,
	"event" text,
	"ranking" integer,
	"read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outcomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"prediction" text NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"outcome" boolean,
	"total_bets" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "predictions" (
	"id" text PRIMARY KEY NOT NULL,
	"event" text,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"rules" jsonb NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"event" text NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nexus" RENAME COLUMN "farcaster" TO "username";--> statement-breakpoint
ALTER TABLE "creations" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "community" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "end" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "communities" ADD COLUMN "channel" text;--> statement-breakpoint
ALTER TABLE "communities" ADD COLUMN "parent" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "admin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "fid" integer;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "station" integer;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "prediction" text;--> statement-breakpoint
ALTER TABLE "communities" DROP COLUMN IF EXISTS "channels";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "season";--> statement-breakpoint
ALTER TABLE "nexus" ADD CONSTRAINT "nexus_username_unique" UNIQUE("username");