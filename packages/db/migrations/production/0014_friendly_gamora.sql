CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"community" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"season" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "links" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quests" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"community" text NOT NULL,
	"season" text DEFAULT '' NOT NULL,
	"event" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"start" timestamp,
	"end" timestamp,
	"xp" integer NOT NULL,
	"actions" text[] NOT NULL,
	"action_inputs" jsonb[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"season" integer NOT NULL,
	"rank" integer NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ranks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"color" text DEFAULT '' NOT NULL,
	"place" smallint NOT NULL,
	"percentile" numeric(4, 3) NOT NULL,
	"season" integer NOT NULL,
	"votes" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seasons" (
	"id" serial PRIMARY KEY NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"type" text NOT NULL,
	"tag" text,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "xp" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"amount" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"season" text NOT NULL,
	"quest" text,
	"snapshot" text
);
--> statement-breakpoint
DROP TABLE "badges";--> statement-breakpoint
ALTER TABLE "nexus" RENAME COLUMN "user" TO "id";--> statement-breakpoint
ALTER TABLE "creations" ALTER COLUMN "community" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "proposals" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ALTER COLUMN "image" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "proposals" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "community" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "rank" integer;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "xp" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "image" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "interests" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "wallet" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "twitter" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "discord" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "farcaster" text;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "video" text;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "event" text;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "type" text DEFAULT 'markdown' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "creations" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "tier";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "value";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "banner";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "min_proposer_rank";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "min_voter_rank";