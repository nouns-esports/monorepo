CREATE TABLE IF NOT EXISTS "proposals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"round" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"value" numeric(78) NOT NULL,
	"created_at" timestamp NOT NULL,
	"hidden" boolean DEFAULT false,
	"published" boolean DEFAULT false
);
