CREATE TABLE IF NOT EXISTS "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"content" jsonb NOT NULL,
	"publishedAt" timestamp NOT NULL
);
