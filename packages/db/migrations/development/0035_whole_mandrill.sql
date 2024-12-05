CREATE TABLE IF NOT EXISTS "stations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"event" text NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "station" integer;