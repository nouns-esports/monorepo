ALTER TABLE "rounds" ADD COLUMN "min_proposer_rank" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "min_voter_rank" integer DEFAULT 0 NOT NULL;