DO $$ BEGIN
 CREATE TYPE "public"."creationType" AS ENUM('art', 'photograph');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
	"type" "creationType" NOT NULL,
	"title" text,
	"created_at" timestamp,
	"original" text,
	"tags" text[] NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "creators";--> statement-breakpoint
DROP TABLE "games";--> statement-breakpoint
DROP TABLE "projects";--> statement-breakpoint
DROP TABLE "snapshots";--> statement-breakpoint
ALTER TABLE "rosters" RENAME COLUMN "game" TO "community";