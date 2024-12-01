CREATE TABLE IF NOT EXISTS "stations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"event" text NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attendees" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "station" text;