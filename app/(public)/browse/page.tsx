import { Suspense } from "react";
import { getRecipesByCategory } from "@/db/queries/recipes";
import { auth } from "@/lib/auth";
import { BrowseView } from "./components/BrowseView";

export default async function BrowsePage() {
  const [session, categories] = await Promise.all([
    auth(),
    getRecipesByCategory(),
  ]);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <Suspense>
        <BrowseView
          categories={categories}
          isAuthenticated={!!session?.user}
        />
      </Suspense>
    </div>
  );
}
