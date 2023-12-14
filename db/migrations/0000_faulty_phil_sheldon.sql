CREATE TABLE IF NOT EXISTS "creators" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"liquipedia" varchar(256),
	"twitch" varchar(256),
	"twitter" varchar(256),
	"youtube" varchar(256),
	"tiktok" varchar(256),
	"instagram" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"color" char(7) NOT NULL,
	"rosters" varchar(256)[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"url" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roster" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"talent" varchar(256)[] NOT NULL,
	"liquipedia" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "talent" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"role" varchar(256) NOT NULL,
	"game" varchar(256) NOT NULL,
	"liquipedia" varchar(256),
	"twitch" varchar(256),
	"twitter" varchar(256),
	"youtube" varchar(256),
	"tiktok" varchar(256),
	"instagram" varchar(256)
);
