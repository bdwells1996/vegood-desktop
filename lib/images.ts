/**
 * Returns the image URL for an ingredient.
 * Currently uses the stored Unsplash URL directly.
 * See GitHub issue #9 to migrate this to Cloudflare R2.
 */
export function getIngredientImageUrl(imageUrl: string | null): string | null {
  return imageUrl ?? null;
}
