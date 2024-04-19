CREATE TABLE IF NOT EXISTS "awards" (
	"id" serial PRIMARY KEY NOT NULL,
	"round" text NOT NULL,
	"place" smallint NOT NULL,
	"type" text NOT NULL,
	"value" numeric(78) NOT NULL
);
