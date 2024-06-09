ALTER TABLE "rounds" ALTER COLUMN "end" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "timestamp" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "who";--> statement-breakpoint
ALTER TABLE "proposals" DROP COLUMN IF EXISTS "why";