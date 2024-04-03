CREATE TABLE IF NOT EXISTS "awards" (
	"round" text NOT NULL,
	"place" smallint NOT NULL,
	"type" text NOT NULL,
	"value" numeric(78) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposals" (
	"user" text PRIMARY KEY NOT NULL,
	"round" text NOT NULL,
	"title" text NOT NULL,
	"who" text NOT NULL,
	"why" text NOT NULL,
	"value" numeric(78) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"user" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votes" (
	"user" text PRIMARY KEY NOT NULL,
	"round" text NOT NULL,
	"count" smallint NOT NULL
);
