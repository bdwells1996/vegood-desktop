"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { StepIngredientCard } from "./StepIngredientCard";
import type { RecipeDetail } from "@/db/queries/recipes";

interface StepNavigatorProps {
  recipeId: string;
  steps: RecipeDetail["steps"];
}

export function StepNavigator({ recipeId, steps }: StepNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const step = steps[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  if (!step) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-content-tertiary">
          <span>Step {step.stepNumber} of {steps.length}</span>
          <span>{Math.round(((currentIndex + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step instruction */}
      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
            {step.stepNumber}
          </span>
          <h2 className="text-lg font-semibold text-content-primary">
            Step {step.stepNumber}
          </h2>
        </div>
        <p className="text-base text-content-secondary leading-relaxed">
          {step.instruction}
        </p>
      </div>

      {/* Per-step ingredients */}
      {step.stepIngredients.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-widest mb-3">
            For this step
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {step.stepIngredients.map((si) => (
              <StepIngredientCard
                key={si.id}
                name={si.ingredient.name}
                imageUrl={si.ingredient.imageUrl}
                quantity={si.quantity}
                unit={si.unit}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-content-primary hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>

        {isLast ? (
          <Link
            href={`/recipes/${recipeId}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            <CheckCircle className="size-4" />
            Done!
          </Link>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
