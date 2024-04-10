/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'proposals'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "proposals" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'votes'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "votes" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "proposals" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "proposal" integer NOT NULL;