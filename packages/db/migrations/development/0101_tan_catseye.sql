ALTER TABLE "proposals" ALTER COLUMN "user" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "user" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "user" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" ALTER COLUMN "user" SET NOT NULL;