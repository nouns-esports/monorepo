ALTER TABLE "communities" ALTER COLUMN "channel" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "communities" ALTER COLUMN "channel" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "communities" DROP COLUMN IF EXISTS "channels";