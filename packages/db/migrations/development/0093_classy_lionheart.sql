CREATE TABLE IF NOT EXISTS "clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"user" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "incentives";--> statement-breakpoint
DROP TABLE "snapshots";--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "min_proposer_rank" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "min_proposer_rank" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "min_voter_rank" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "min_voter_rank" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "reason" text;--> statement-breakpoint
ALTER TABLE "xp" DROP COLUMN IF EXISTS "incentive";