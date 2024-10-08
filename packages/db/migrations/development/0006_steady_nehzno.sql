ALTER TABLE "creations" ALTER COLUMN "type" SET DEFAULT 'art';--> statement-breakpoint
ALTER TABLE "creations" ALTER COLUMN "community" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rounds" ALTER COLUMN "community" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rounds" DROP COLUMN IF EXISTS "banner";