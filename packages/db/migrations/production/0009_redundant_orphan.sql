CREATE TABLE IF NOT EXISTS "proposals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"round" text NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"value" numeric(78) NOT NULL,
	"created_at" timestamp NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"total_votes" smallint DEFAULT 0 NOT NULL,
	"image" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"start" timestamp NOT NULL,
	"voting_start" timestamp NOT NULL,
	"end" timestamp,
	"tags" text[] NOT NULL,
	"image" text NOT NULL,
	"banner" text NOT NULL
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
