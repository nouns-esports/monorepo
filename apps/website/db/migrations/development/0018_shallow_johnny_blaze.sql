CREATE TABLE IF NOT EXISTS "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"proposal" integer NOT NULL,
	"round" text NOT NULL,
	"count" smallint NOT NULL,
	"timestamp" timestamp NOT NULL
);
