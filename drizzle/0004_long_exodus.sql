CREATE TYPE "public"."meal_slot" AS ENUM('breakfast', 'lunch', 'dinner');--> statement-breakpoint
CREATE TABLE "meal_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"slot" "meal_slot" NOT NULL,
	"recipe_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "meal_plans_user_id_date_slot_unique" UNIQUE("user_id","date","slot")
);
--> statement-breakpoint
ALTER TABLE "meal_plans" ADD CONSTRAINT "meal_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_plans" ADD CONSTRAINT "meal_plans_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;