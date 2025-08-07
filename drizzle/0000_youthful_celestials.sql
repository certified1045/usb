CREATE TABLE "person" (
	"password_hash" varchar(120) NOT NULL,
	"full_name" varchar(120) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(60) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"currency" varchar(1) DEFAULT '$' NOT NULL,
	"account_bal" integer DEFAULT 0 NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"verifying" boolean DEFAULT false NOT NULL,
	"pending_KYC" boolean DEFAULT false NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL,
	"account_no" serial PRIMARY KEY NOT NULL,
	"trans" json,
	"pin" varchar(5) DEFAULT '44774' NOT NULL,
	CONSTRAINT "person_phone_unique" UNIQUE("phone"),
	CONSTRAINT "person_email_unique" UNIQUE("email"),
	CONSTRAINT "person_account_no_unique" UNIQUE("account_no")
);

CREATE TABLE "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"identity_doc" text NOT NULL,
	"address_doc" text NOT NULL
);

ALTER TABLE "verification" ADD CONSTRAINT "verification_user_id_person_account_no_fk" FOREIGN KEY ("user_id") REFERENCES "public"."person"("account_no") ON DELETE no action ON UPDATE no action;