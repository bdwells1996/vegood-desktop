import Link from "next/link";
import { getRecipesByCategory } from "@/db/queries/recipes";
import { auth } from "@/lib/auth";
import { CategorySection } from "./components/CategorySection";

export default async function BrowsePage() {
  const [session, categories] = await Promise.all([
    auth(),
    getRecipesByCategory(),
  ]);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Browse Recipes</h1>
        {session?.user ? (
          <Link href="/my-account" className="text-primary-500 hover:underline">
            My account
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="text-primary-500 hover:underline">
              Log in
            </Link>
            <Link href="/signup" className="text-primary-500 hover:underline">
              Sign up
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
