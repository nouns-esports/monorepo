ALTER TABLE "creations" ADD COLUMN "type" text DEFAULT 'art' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "min_proposer_rank" integer;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "min_voter_rank" integer;