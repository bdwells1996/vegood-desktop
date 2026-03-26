import { Clock, ChefHat, Users, Flame } from "lucide-react";
import type { FC } from "react";
import Image from "next/image";
import { Badge } from "@/app/components/Badge";
import { StarRating } from "@/app/components/StarRating";
import type { RecipeDetail, RatingSummary } from "@/db/queries/recipes";

interface RecipeHeaderProps {
  recipe: RecipeDetail;
  ratingSummary: RatingSummary;
}

export const RecipeHeader: FC<RecipeHeaderProps> = ({ recipe, ratingSummary }) => {
  const avgRating = ratingSummary.avg ? parseFloat(ratingSummary.avg) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero image */}
      {recipe.imageUrl && (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {/* Title + meta */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-content-primary">
          {recipe.title}
        </h1>

        {recipe.description && (
          <p className="text-base text-content-secondary leading-relaxed">
            {recipe.description}
          </p>
        )}

        {/* Rating */}
        {avgRating !== null && (
          <div className="flex items-center gap-2">
            <StarRating rating={avgRating} />
            <span className="text-sm text-content-tertiary">
              {avgRating.toFixed(1)} ({ratingSummary.count.toLocaleString()} ratings)
            </span>
          </div>
        )}

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mt-1">
          {recipe.prepTimeMins != null && (
            <Badge variant="grey" icon={Clock} label={`Prep ${recipe.prepTimeMins} min`} />
          )}
          {recipe.cookTimeMins != null && (
            <Badge variant="grey" icon={Flame} label={`Cook ${recipe.cookTimeMins} min`} />
          )}
          {recipe.servings != null && (
            <Badge variant="grey" icon={Users} label={`${recipe.servings} servings`} />
          )}
          {recipe.cuisine && (
            <Badge variant="grey" label={recipe.cuisine} />
          )}
          {recipe.difficulty && (
            <Badge variant="grey" icon={ChefHat} label={recipe.difficulty} />
          )}
        </div>
      </div>
    </div>
  );
};
