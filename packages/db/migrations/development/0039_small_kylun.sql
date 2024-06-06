CREATE TABLE IF NOT EXISTS "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"decimals" smallint,
	"chain_id" integer,
	"address" text,
	"token_id" text
);
--> statement-breakpoint
ALTER TABLE "awards" ADD COLUMN "asset" text DEFAULT '' NOT NULL;