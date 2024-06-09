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
DROP TABLE "applicationResponses";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'proposals'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "proposals" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "end" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'votes'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "votes" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "awards" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "awards" ADD COLUMN "asset" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "awards" ADD COLUMN "claimed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "hidden" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "published" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "total_votes" smallint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "image" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "voting_start" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "tags" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "banner" text NOT NULL;--> statement-breakpoint
ALTER TABLE "snapshots" ADD COLUMN "metadata" json;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "proposal" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "timestamp" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "awards" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN IF EXISTS "color";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "who";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "why";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "category";