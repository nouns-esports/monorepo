CREATE TABLE IF NOT EXISTS "quests" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"season" integer NOT NULL,
	"community" text NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"xp" integer NOT NULL,
	"actions" text[] NOT NULL,
	"sequential" boolean NOT NULL,
	"min_rank" integer DEFAULT 0 NOT NULL,
	"max_completions" smallint DEFAULT 1 NOT NULL,
	"cooldown" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"season" integer NOT NULL,
	"rank" integer NOT NULL,
	"xp_seasonal" integer DEFAULT 0 NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ranks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"place" smallint NOT NULL,
	"percentile" numeric(3, 2) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "xp" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"xp_earned" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"season" text NOT NULL,
	"quest" text
);
--> statement-breakpoint
ALTER TABLE "nexus" RENAME COLUMN "user" TO "id";--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "rank" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "xp_total" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "wallet" jsonb;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "twitter" jsonb;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "discord" jsonb;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "farcaster" jsonb;--> statement-breakpoint
ALTER TABLE "nexus" ADD COLUMN "linked_accounts" jsonb[] DEFAULT '{}'::jsonb[] NOT NULL;--> statement-breakpoint
ALTER TABLE "nexus" DROP COLUMN IF EXISTS "tier";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "value";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "min_proposer_rank";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "min_voter_rank";