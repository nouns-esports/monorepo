ALTER TABLE "rankings" ALTER COLUMN "xp" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "diff" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "position" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "snapshot_temp" integer;