import type { FC } from "react";
import Image from "next/image";
import { getIngredientImageUrl } from "@/lib/images";

interface StepIngredientCardProps {
  name: string;
  imageUrl: string | null;
  quantity: string | null;
  unit: string | null;
}

export const StepIngredientCard: FC<StepIngredientCardProps> = ({
  name,
  imageUrl,
  quantity,
  unit,
}) => {
  const resolvedImageUrl = getIngredientImageUrl(imageUrl);
  const quantityLabel = quantity ? (unit ? `${quantity} ${unit}` : quantity) : null;

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-3 text-center">
      {resolvedImageUrl ? (
        <div className="relative size-16 rounded-lg overflow-hidden">
          <Image
            src={resolvedImageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div className="size-16 rounded-lg bg-neutral-100 flex items-center justify-center text-2xl">
          🥗
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-content-primary capitalize leading-tight">
          {name}
        </p>
        {quantityLabel && (
          <p className="text-xs text-content-tertiary mt-0.5">{quantityLabel}</p>
        )}
      </div>
    </div>
  );
};
