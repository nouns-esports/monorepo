ALTER TABLE "proposals" ALTER COLUMN "user" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "user" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" ALTER COLUMN "user" DROP NOT NULL;