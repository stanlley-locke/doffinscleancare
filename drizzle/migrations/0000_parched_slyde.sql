CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'completed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."lead_type" AS ENUM('inquiry', 'booking');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('Cleaning', 'Pest Control', 'Other');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"last_login" timestamp,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"service" text NOT NULL,
	"location" text NOT NULL,
	"message" text,
	"status" text DEFAULT 'new',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"description" text NOT NULL,
	"features" text NOT NULL,
	"starting_price" double precision NOT NULL,
	"unit" text NOT NULL,
	"category" text NOT NULL,
	"image_url" text,
	"display_order" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_name_unique" UNIQUE("name")
);
