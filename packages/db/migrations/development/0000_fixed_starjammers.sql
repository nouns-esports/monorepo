CREATE TABLE IF NOT EXISTS "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"decimals" smallint,
	"chain_id" integer,
	"address" text,
	"token_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "awards" (
	"id" serial PRIMARY KEY NOT NULL,
	"round" text NOT NULL,
	"place" smallint NOT NULL,
	"asset" text DEFAULT '' NOT NULL,
	"value" numeric(78) NOT NULL,
	"claimed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "communities" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"name" text NOT NULL,
	"channels" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "creations" (
	"id" text PRIMARY KEY NOT NULL,
	"creator" text,
	"type" text NOT NULL,
	"title" text,
	"created_at" timestamp,
	"original" text,
	"community" text DEFAULT '' NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "nexus" (
	"id" text PRIMARY KEY NOT NULL,
	"rank" integer,
	"xp" integer DEFAULT 0 NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"bio" text,
	"interests" text[] DEFAULT '{}' NOT NULL,
	"wallet" text,
	"twitter" text,
	"discord" text,
	"farcaster" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"round" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"image" text,
	"video" text,
	"created_at" timestamp NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"total_votes" smallint DEFAULT 0 NOT NULL
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
	"xp" integer NOT NULL,
	"actions" text[] NOT NULL,
	"action_inputs" jsonb[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"season" integer NOT NULL,
	"place" integer NOT NULL,
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
	"percentile" numeric(3, 2) NOT NULL,
	"season" integer NOT NULL,
	"votes" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rosters" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"community" text NOT NULL,
	"liquipedia" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"banner" text NOT NULL,
	"community" text DEFAULT '' NOT NULL,
	"event" text,
	"type" text DEFAULT 'markdown' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"content" text NOT NULL,
	"start" timestamp NOT NULL,
	"voting_start" timestamp NOT NULL,
	"end" timestamp,
	"min_proposer_rank" integer,
	"min_voter_rank" integer
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
	"type" text,
	"tag" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "talent" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"role" text NOT NULL,
	"roster" text NOT NULL,
	"liquipedia" text,
	"twitch" text,
	"twitter" text,
	"youtube" text,
	"tiktok" text,
	"instagram" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"proposal" integer NOT NULL,
	"round" text NOT NULL,
	"count" smallint NOT NULL,
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
