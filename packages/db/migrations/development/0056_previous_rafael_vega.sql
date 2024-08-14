ALTER TABLE "creations" ADD COLUMN "community" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "community" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "min_proposer_rank" "nexusTiers" DEFAULT 'Explorer' NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "min_voter_rank" "nexusTiers" DEFAULT 'Explorer' NOT NULL;--> statement-breakpoint
ALTER TABLE "creations" DROP COLUMN IF EXISTS "tags";--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "tags";