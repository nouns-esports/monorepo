DO $$ BEGIN
 CREATE TYPE "public"."nexusTiers" AS ENUM('Explorer', 'Challenger', 'Elite');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nexus" (
	"user" text PRIMARY KEY NOT NULL,
	"tier" "nexusTiers" NOT NULL
);
