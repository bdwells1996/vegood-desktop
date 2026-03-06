CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"slug" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "recipe_categories" (
	"recipe_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "recipe_categories_recipe_id_category_id_pk" PRIMARY KEY("recipe_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image_url" text,
	"time_minutes" integer,
	"rating" numeric(3, 2),
	"rating_count" integer DEFAULT 0 NOT NULL,
	"dietary_tags" text[] DEFAULT '{}' NOT NULL,
	"allergens" text[] DEFAULT '{}' NOT NULL,
	"author_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;