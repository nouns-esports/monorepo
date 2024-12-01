ALTER TABLE "predictions" ADD COLUMN "xp" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "xp" ADD COLUMN "prediction" text;