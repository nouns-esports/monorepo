ALTER TABLE "snapshots" ALTER COLUMN "tag" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ADD COLUMN "diff" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" DROP COLUMN IF EXISTS "season";