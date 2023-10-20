CREATE TABLE IF NOT EXISTS "giveaway_emails" (
	"email" varchar(256) NOT NULL,
	CONSTRAINT "giveaway_emails_email_unique" UNIQUE("email")
);
