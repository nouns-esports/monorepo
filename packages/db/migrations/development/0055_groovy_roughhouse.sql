DROP TABLE "art";--> statement-breakpoint
DROP TABLE "games";--> statement-breakpoint
ALTER TABLE "creations" ALTER COLUMN "width" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "creations" ALTER COLUMN "height" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rosters" ALTER COLUMN "community" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rosters" DROP COLUMN IF EXISTS "game";