CREATE TABLE IF NOT EXISTS "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"previous" text,
	"next" text,
	"path" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "achievement" text;