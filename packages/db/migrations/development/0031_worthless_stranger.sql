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
