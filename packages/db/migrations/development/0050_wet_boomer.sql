CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"image" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text,
	"read" boolean DEFAULT false NOT NULL
);
