CREATE TABLE IF NOT EXISTS "creators" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"liquipedia" text,
	"twitch" text,
	"twitter" text,
	"youtube" text,
	"tiktok" text,
	"instagram" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"color" char(7) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rosters" (
	"id" text PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" text NOT NULL,
	"game" text NOT NULL,
	"liquipedia" text NOT NULL
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
